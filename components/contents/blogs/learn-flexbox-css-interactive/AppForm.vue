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
  <client-only>
    <app-demo :path="DEFAULT_PATH" :name="$options.name" class="flex-form">
      <transition name="fade" mode="out-in">
        <div v-if="!isSubmitted" class="flex-form__content">
          <app-intersect
            :threshold="[0.5]"
            @enter="onContentRandomEnter"
            @leave="onContentRandomLeave"
          >
            <div v-if="hints.length > 0" class="content__random">
              <transition-group name="fade" mode="out-in">
                <button
                  v-for="(hint, i) in hints"
                  :key="hint"
                  class="app-demo__form"
                  @click="onChoose(hint, i)"
                >
                  {{ hint }}
                </button>
              </transition-group>
            </div>
          </app-intersect>
          <div class="content__textarea">
            <label class="block">
              <span>{{ $t('answer') }}</span>
              <textarea
                v-model="answers"
                class="block w-full app-demo__form"
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
                class="block w-full app-demo__form"
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
                  <small v-else>
                    {{ $t('comment_info.cool') }}
                  </small>
                </transition>
              </template>
            </label>
          </div>
          <div class="content__action">
            <button
              class="app-demo__form"
              :disabled="isLoading"
              @click="onReset"
            >
              {{ $t('reset') }}
            </button>
            <button
              class="app-demo__form"
              :disabled="isLoading || answers.length < ANSWERS_MIN_LENGTH"
              @click="onSubmit"
            >
              {{ isLoading ? $t('sending') : $t('send') }}
            </button>
          </div>
        </div>
        <div v-else class="flex-form__success">
          <p>{{ $t('comments_is_saved') }}</p>
          <p>{{ $t('your_opinion') }}</p>
          <div class="mb-8">
            <button v-for="hint in hints" :key="hint" class="app-demo__form">
              {{ hint }}
            </button>
          </div>
          <template v-if="comment">
            <p>{{ $t('your_comments') }}</p>
            <blockquote>
              <p>{{ comment }}</p>
            </blockquote>
          </template>
          <div class="content__action">
            <button
              class="app-demo__form"
              :disabled="isLoading"
              @click="onReset"
            >
              {{ $t('reset') }}
            </button>
          </div>
        </div>
      </transition>
    </app-demo>
  </client-only>
</template>

<script lang="ts">
import ExtendableLearnFlexbox from './ExtendableLearnFlexbox'
import { ANSWERS_MIN_LENGTH, COMMENT_MIN_LENGTH, STORAGE_KEY } from './constant'
import { isExists } from '~/utils'

export default ExtendableLearnFlexbox.extend({
  data() {
    return {
      answers: '',
      comment: '',
      isLoading: false,
      isSubmitted: false,
      hints: [],
      ANSWERS_MIN_LENGTH,
      COMMENT_MIN_LENGTH
    }
  },
  mounted() {
    this.getData()
    if (!localStorage.getItem(STORAGE_KEY)) {
      this.initHints({ random: false, reset: true })
    }
  },
  methods: {
    // Taken from: https://gist.github.com/guilhermepontes/17ae0cc71fa2b13ea8c20c94c5c35dc4#gistcomment-2271465
    initHints(
      {
        random = true,
        reset = false
      }: { random?: boolean; reset?: boolean } = { random: true, reset: false }
    ) {
      let hints = []
      if (reset) {
        hints = (this.$t('flexbox') as string).split(' ')
      } else {
        hints = this.hints
      }
      if (random) {
        hints = hints
          .map((a) => [Math.random(), a])
          .sort((a: any, b: any) => a[0] - b[0])
          .map((a) => a[1])
      }
      this.hints = hints as never[]
    },
    onContentRandomEnter() {
      this.initHints()
    },
    onContentRandomLeave() {
      this.initHints({ random: false })
    },
    onChoose(hint: string, i: number) {
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
      this.isSubmitted = false
      this.answers = ''
      this.comment = ''
      localStorage.removeItem(STORAGE_KEY)
    },
    onSubmit() {
      if (isExists(this.answers) && this.answers.length >= ANSWERS_MIN_LENGTH) {
        try {
          this.isLoading = true
          this.sendData()
          this.isSubmitted = true
          this.answers = ''
          this.comment = ''
          this.getData()
        } catch (error) {
        } finally {
          this.isLoading = false
        }
      }
    },
    sendData() {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          answers: this.answers,
          comment: this.comment
        })
      )
    },
    getData() {
      try {
        this.isLoading = true
        const data = JSON.parse(localStorage.getItem(STORAGE_KEY) as string)
        if (data) {
          this.hints = data.answers.split(' ')
          this.comment = data.comment
          this.isSubmitted = true
        }
      } catch (error) {
        this.isSubmitted = false
      } finally {
        this.isLoading = false
      }
    }
  }
})
</script>

<style>
.prose-lg {
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
}
</style>
