<i18n>
{
  "id": {
    "answer": "Jawaban Kamu",
    "flexbox_is": "Flexbox adalah.....",
    "add_more_comment": "Ingin menambahkan komentar lain?",
    "in_my_opinion": "Menurut pendapat saya.....",
    "sending": "Mengirim...",
    "reset": "Atur Ulang",
    "send": "Kirim",
    "flexbox": "Flexbox adalah sistem tata letak pada CSS untuk mengatur dan mendistribusikan item di dalam elemen kontainer",
    "comment_info": {
      "more": "Ayo tambahin lagi ya komentarnya, masih kurang {num} karakter lagi nih.",
      "cool": "Mantap, komentar Kamu keren!"
    },
    "comments_is_saved": "Terima kasih, jawaban dan komentar Kamu telah disimpan!",
    "your_opinion": "Jadi menurut Kamu:",
    "your_comments": "dan komentar Kamu adalah:"
  },
  "en": {
    "answer": "Your Answer",
    "flexbox_is": "Flexbox is.....",
    "add_more_comment": "Wanna add another comment?",
    "in_my_opinion": "In my opinion.....",
    "sending": "Sending...",
    "reset": "Reset",
    "send": "Send",
    "flexbox": "Flexbox is a layout system in CSS to organize and distribute items inside the container element",
    "comment_info": {
      "more": "Please add more comments, it still needs {num} characters more.",
      "cool": "Great, your comments is cool!"
    },
    "comments_is_saved": "Thank you, your answers and comments have been saved!",
    "your_opinion": "So according to you:",
    "your_comments": "and your comment is:"
  }
}
</i18n>

<template>
  <div class="flex-form">
    <transition name="fade" mode="out-in">
      <div v-if="!isSubmitted" class="flex-form__content">
        <client-only>
          <intersect
            :threshold="[0.5]"
            @enter="onContentRandomEnter"
            @leave="onContentRandomLeave"
          >
            <div v-if="hints.length > 0" class="content__random">
              <transition-group name="fade" mode="out-in">
                <button
                  v-for="(hint, i) in hints"
                  :key="hint"
                  class="btn"
                  @click="onChoose(hint, i)"
                >
                  {{ hint }}
                </button>
              </transition-group>
            </div>
          </intersect>
        </client-only>
        <div class="content__textarea">
          <label class="block">
            <span>{{ $t('answer') }}</span>
            <textarea
              v-model="answers"
              class="block w-full textarea"
              rows="3"
              readonly=""
              :placeholder="$t('flexbox_is')"
            ></textarea>
          </label>
        </div>
        <div class="content__textarea">
          <label class="block">
            <span>{{ $t('add_more_comment') }}</span>
            <textarea
              v-model="comment"
              class="block w-full textarea"
              rows="3"
              :placeholder="$t('in_my_opinion')"
            ></textarea>
            <template v-if="comment.length >= 5">
              <transition name="fade" mode="out-in">
                <small v-if="comment.length < COMMENT_MIN_LENGTH">
                  {{
                    $t('comment_info.more', {
                      num: COMMENT_MIN_LENGTH - comment.length
                    })
                  }}
                </small>
                <small v-else="">
                  {{ $t('comment_info.cool') }}
                </small>
              </transition>
            </template>
          </label>
        </div>
        <div class="content__action">
          <button class="btn" :disabled="isLoading" @click="onReset">
            {{ $t('reset') }}
          </button>
          <button
            class="btn"
            :disabled="isLoading || answers.length < ANSWERS_MIN_LENGTH"
            @click="onSubmit"
          >
            {{ isLoading ? $t('sending') : $t('send') }}
          </button>
        </div>
        <client-only>
          <vue-recaptcha
            ref="recaptcha"
            :sitekey="RECAPTCHA_API_KEY"
            load-recaptcha-script=""
            badge="bottomleft"
            size="invisible"
            @verify="onVerify"
            @expired="onExpired"
          >
          </vue-recaptcha>
        </client-only>
      </div>
      <div v-else="" class="flex-form__success">
        <p>{{ $t('comments_is_saved') }}</p>
        <p>{{ $t('your_opinion') }}</p>
        <div class="mb-8">
          <button v-for="hint in hints" :key="hint" class="btn">
            {{ hint }}
          </button>
        </div>
        <p>{{ $t('your_comments') }}</p>
        <blockquote>
          <p>{{ comment }}</p>
        </blockquote>
      </div>
    </transition>
  </div>
</template>

<script>
import { ulid } from 'ulid'
import firestoreParser from 'firestore-parser'
import { ANSWERS_MIN_LENGTH, COMMENT_MIN_LENGTH, COOKIE_KEY } from './constant'
import { isExists } from '~/utils'

const Cookie = process.client ? require('js-cookie') : undefined

export default {
  data() {
    return {
      token: '',
      answers: '',
      comment: '',
      rating: 0,
      isLoading: false,
      isSubmitted: false,
      hints: [],
      RECAPTCHA_API_KEY: process.env.RECAPTCHA_API_KEY,
      ANSWERS_MIN_LENGTH,
      COMMENT_MIN_LENGTH
    }
  },
  created() {
    this.initHints({ random: false, reset: true })
  },
  mounted() {
    this.initForm()
  },
  methods: {
    // Taken from: https://gist.github.com/guilhermepontes/17ae0cc71fa2b13ea8c20c94c5c35dc4#gistcomment-2271465
    initHints(
      { random = true, reset = false } = { random: true, reset: false }
    ) {
      let hints = []
      if (reset) {
        hints = this.$t('flexbox').split(' ')
      } else {
        hints = this.hints
      }
      if (random) {
        hints = hints
          .map((a) => [Math.random(), a])
          .sort((a, b) => a[0] - b[0])
          .map((a) => a[1])
      }
      this.hints = hints
    },
    initForm() {
      const id = Cookie.get(COOKIE_KEY)
      if (isExists(id) && id.length === 26) {
        this.isSubmitted = true
        this.getData(id)
      }
    },
    onContentRandomEnter() {
      this.initHints()
    },
    onContentRandomLeave() {
      this.initHints({ random: false })
    },
    onVerify(token) {
      this.token = token
      this.onSubmit()
    },
    onExpired() {
      this.token = ''
    },
    onChoose(hint, i) {
      if (this.answers.length === 0) {
        this.answers = hint
        this.hints.splice(i, 1)
      } else if (!this.answers.split(' ').includes(hint)) {
        this.answers = `${this.answers} ${hint}`
        this.hints.splice(i, 1)
      }
    },
    onReset() {
      this.initHints({ reset: true })
      this.answers = ''
      this.comment = ''
    },
    async onSubmit() {
      if (isExists(this.token) && this.token.length > 0) {
        if (
          isExists(this.answers) &&
          this.answers.length >= ANSWERS_MIN_LENGTH
        ) {
          try {
            this.isLoading = true
            const id = ulid()
            const { success } = (await this.validateRecaptcha()) || {
              success: false
            }
            if (!success) {
              this.$refs.recaptcha.execute()
            }
            const data = await this.sendData(id)
            if (data) {
              if (data.error) {
                throw new Error('Failed to submit data')
              }
              this.isSubmitted = true
              this.token = ''
              this.answers = ''
              this.comment = ''
              Cookie.set(COOKIE_KEY, id, {
                expires: 30
              })
              await this.getData(id)
            }
          } catch (error) {
          } finally {
            this.isLoading = false
          }
        }
      } else {
        this.$refs.recaptcha.execute()
      }
    },
    async validateRecaptcha() {
      try {
        const response = await fetch(
          'https://us-central1-jefrydco.cloudfunctions.net/validateRecaptcha',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              token: this.token
            })
          }
        )
        return response.json()
      } catch (error) {}
    },
    async sendData(id) {
      try {
        const response = await fetch(
          `https://firestore.googleapis.com/v1/projects/jefrydco/databases/(default)/documents/flexbox-survey?documentId=${id}&key=${process.env.FIREBASE_API_KEY}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              fields: {
                token: {
                  stringValue: this.token
                },
                answers: {
                  stringValue: this.answers
                },
                comment: {
                  stringValue: this.comment
                }
              }
            })
          }
        )
        return response.json()
      } catch (error) {}
    },
    async getData(id) {
      try {
        this.isLoading = true
        const response = await fetch(
          `https://firestore.googleapis.com/v1/projects/jefrydco/databases/(default)/documents/flexbox-survey/${id}?key=${process.env.FIREBASE_API_KEY}`
        )
        const data = await response.json()
        if (data) {
          if (data.error) {
            throw new Error('Failed to load data')
          }
          const { fields } = firestoreParser(data)
          this.hints = fields.answers.split(' ')
          this.comment = fields.comment
        }
      } catch (error) {
        this.isSubmitted = false
        Cookie.remove(COOKIE_KEY)
      } finally {
        this.isLoading = false
      }
    }
  }
}
</script>

<style>
.content {
  &__random,
  &__action {
    @apply flex flex-wrap;
  }

  &__random,
  &__textarea {
    @apply mb-8;
  }

  &__action {
    @apply justify-end;
  }
}
</style>
