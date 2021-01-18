<i18n>
{
  "id": {
    "container": "Kontainer",
    "item": "Item",
    "itemCount": "Jumlah Item",
    "reset": "Atur Ulang",
    "value": "Nilai",
    "differentHeight": "Atur Ketinggian Berbeda"
  },
  "en": {
    "container": "Container",
    "item": "Item",
    "itemCount": "Item Count",
    "reset": "Reset",
    "value": "Value",
    "differentHeight": "Set Different Height"
  }
}
</i18n>

<template>
  <client-only>
    <app-demo :path="DEFAULT_PATH" :name="$options.name" class="demo--combined">
      <div class="demo__interactive">
        <div class="interact">
          <h3 class="interact__heading">{{ $t('container') }}</h3>
          <div class="flex-property">
            <div
              class="flex-property__item flex-property__item--flex-direction"
            >
              <h4 class="flex-property__heading">Flex Direction</h4>
              <div class="flex-property__options">
                <div
                  v-for="flexDirection in flexDirectionList"
                  :key="flexDirection"
                  class="radio"
                >
                  <label class="radio__label">
                    <input
                      v-model="flexContainer.flexDirection"
                      type="radio"
                      class="radio__input form-radio"
                      name="flex-direction"
                      :value="flexDirection"
                    />
                    <span class="ml-2">{{ flexDirection }}</span>
                  </label>
                </div>
              </div>
            </div>
            <div class="flex-property__item flex-property__item--flex-wrap">
              <h4 class="flex-property__heading">Flex Wrap</h4>
              <div class="flex-property__options">
                <div
                  v-for="flexWrap in flexWrapList"
                  :key="flexWrap"
                  class="radio"
                >
                  <label class="radio__label">
                    <input
                      v-model="flexContainer.flexWrap"
                      type="radio"
                      class="radio__input form-radio"
                      name="flex-wrap"
                      :value="flexWrap"
                    />
                    <span class="ml-2">{{ flexWrap }}</span>
                  </label>
                </div>
              </div>
            </div>
            <div
              class="flex-property__item flex-property__item--justify-content"
            >
              <h4 class="flex-property__heading">Justify Content</h4>
              <div class="flex-property__options">
                <div
                  v-for="justifyContent in justifyContentList"
                  :key="justifyContent"
                  class="radio"
                >
                  <label class="radio__label">
                    <input
                      v-model="flexContainer.justifyContent"
                      type="radio"
                      class="radio__input form-radio"
                      name="justify-content"
                      :value="justifyContent"
                    />
                    <span class="ml-2">{{ justifyContent }}</span>
                  </label>
                </div>
              </div>
            </div>
            <div class="flex-property__item flex-property__item--align-items">
              <h4 class="flex-property__heading">Align Items</h4>
              <div class="flex-property__options">
                <div
                  v-for="alignItems in alignItemsList"
                  :key="alignItems"
                  class="radio"
                >
                  <label class="radio__label">
                    <input
                      v-model="flexContainer.alignItems"
                      type="radio"
                      class="radio__input form-radio"
                      name="align-items"
                      :value="alignItems"
                    />
                    <span class="ml-2">{{ alignItems }}</span>
                  </label>
                </div>
              </div>
            </div>
            <div class="flex-property__item flex-property__item--align-content">
              <h4 class="flex-property__heading">Align Content</h4>
              <div class="flex-property__options">
                <div
                  v-for="alignContent in alignContentList"
                  :key="alignContent"
                  class="radio"
                >
                  <label class="radio__label">
                    <input
                      v-model="flexContainer.alignContent"
                      type="radio"
                      class="radio__input form-radio"
                      name="align-content"
                      :value="alignContent"
                    />
                    <span class="ml-2">{{ alignContent }}</span>
                  </label>
                </div>
              </div>
            </div>
            <div class="flex-property__item">
              <label class="block">
                <span>{{ $t('itemCount') }}</span>
                <input
                  v-model.number="itemCount"
                  class="input mt-1 block w-full"
                  type="number"
                  min="3"
                  max="27"
                />
              </label>
            </div>
          </div>
          <h3 class="interact__heading">{{ $t('item') }}</h3>
          <div class="flex-property">
            <div class="flex-property__item">
              <div class="checkbox">
                <label class="checkbox__label">
                  <input
                    v-model="isDifferentHeight"
                    type="checkbox"
                    class="checkbox__input form-checkbox"
                  />
                  <span class="ml-2">{{ $t('differentHeight') }}</span>
                </label>
              </div>
            </div>
          </div>
          <div class="flex-property__scrollable">
            <div
              v-for="flexItemItem in flexItemList"
              :key="flexItemItem.index"
              :class="
                flexItemItem.index % 2 === 0
                  ? `scrollable__item--${flexItemItem.index} scrollable__item--different-bg`
                  : `scrollable__item--${flexItemItem.index}`
              "
              class="scrollable__item"
            >
              <h2 class="flex-property__heading">
                {{ $t('item') }} {{ flexItemItem.index }}
              </h2>
              <div class="flex-property">
                <div class="flex-property__item">
                  <h4 class="flex-property__heading">Order</h4>
                  <div class="flex-property__options">
                    <label class="block">
                      <span>{{ $t('value') }}</span>
                      <input
                        v-model.number="flexItemItem.style.order"
                        class="input mt-1 block w-full"
                        type="number"
                        min="0"
                        max="12"
                      />
                    </label>
                  </div>
                </div>
                <div class="flex-property__item">
                  <h4 class="flex-property__heading">Flex Grow</h4>
                  <div class="flex-property__options">
                    <label class="block">
                      <span>{{ $t('value') }}</span>
                      <input
                        v-model.number="flexItemItem.style.flexGrow"
                        class="input mt-1 block w-full"
                        type="number"
                        min="0"
                        max="12"
                      />
                    </label>
                  </div>
                </div>
                <div class="flex-property__item">
                  <h4 class="flex-property__heading">Flex Shrink</h4>
                  <div class="flex-property__options">
                    <label class="block">
                      <span>{{ $t('value') }}</span>
                      <input
                        v-model.number="flexItemItem.style.flexShrink"
                        class="input mt-1 block w-full"
                        type="number"
                        min="0"
                        max="12"
                      />
                    </label>
                  </div>
                </div>
                <div class="flex-property__item">
                  <h4 class="flex-property__heading">Flex Basis</h4>
                  <div class="flex-property__options">
                    <div class="checkbox mb-5">
                      <label class="checkbox__label">
                        <input
                          v-model="flexItemItem.isFlexBasisAuto"
                          type="checkbox"
                          class="checkbox__input form-checkbox"
                        />
                        <span class="ml-2">Auto</span>
                      </label>
                    </div>
                    <label class="block">
                      <span>{{ $t('value') }} (%)</span>
                      <input
                        v-model.number="flexItemItem.flexBasis"
                        :disabled="flexItemItem.isFlexBasisAuto"
                        class="input mt-1 block w-full"
                        type="number"
                        min="0"
                        max="100"
                        step="10"
                      />
                    </label>
                  </div>
                </div>
                <div class="flex-property__item">
                  <h4 class="flex-property__heading">Align Self</h4>
                  <div class="flex-property__options">
                    <div
                      v-for="alignSelf in alignSelfList"
                      :key="alignSelf"
                      class="radio"
                    >
                      <label class="radio__label">
                        <input
                          v-model="flexItemItem.style.alignSelf"
                          type="radio"
                          class="radio__input form-radio"
                          :name="`align-self-item-${flexItemItem.index}`"
                          :value="alignSelf"
                        />
                        <span class="ml-2">{{ alignSelf }}</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="flex-property">
            <div class="flex-property__item">
              <button class="btn" @click="onReset">
                {{ $t('reset') }}
              </button>
            </div>
          </div>
        </div>
      </div>
      <client-only>
        <app-intersect
          :threshold="[0.5]"
          @enter="onFlexboxDemoEnter"
          @leave="onFlexboxDemoLeave"
        >
          <app-flexbox-demo
            :flex-container="flexContainer"
            :flex-item-list="flexItemList"
            :is-different-height="isDifferentHeight"
            :on-box-clicked="onBoxClicked"
          />
        </app-intersect>
      </client-only>
      <transition name="fade">
        <app-flexbox-demo
          v-if="isFlexboxDemoFloatingDisplay"
          :flex-container="flexContainer"
          :flex-item-list="flexItemList"
          :is-different-height="isDifferentHeight"
          :on-box-clicked="onBoxClicked"
          is-floating=""
        />
      </transition>
      <pre class="demo__code">{{ html }}</pre>
    </app-demo>
  </client-only>
</template>

<script lang="ts">
import vkbeautify from 'vkbeautify'
import objToStyle from 'style-object-to-css-string'

import ExtendableLearnFlexbox from './ExtendableLearnFlexbox'
import {
  FLEX,
  FLEX_DIRECTION,
  FLEX_WRAP,
  JUSTIFY_CONTENT,
  ALIGN_ITEMS,
  ALIGN_CONTENT,
  ALIGN_SELF,
  AUTO
} from './constant'

export default ExtendableLearnFlexbox.extend({
  name: 'AppFlexbox',
  data() {
    return {
      itemCount: 3,
      flexContainer: {
        display: FLEX,
        flexDirection: FLEX_DIRECTION.ROW,
        flexWrap: FLEX_WRAP.NOWRAP,
        justifyContent: JUSTIFY_CONTENT.FLEX_START,
        alignItems: ALIGN_ITEMS.STRETCH,
        alignContent: ALIGN_CONTENT.STRETCH,
        height: '100%'
      },
      flexItem: {
        alignSelf: ALIGN_SELF.AUTO,
        flexBasis: AUTO
      },
      flexDirectionList: Object.values(FLEX_DIRECTION),
      flexWrapList: Object.values(FLEX_WRAP),
      justifyContentList: Object.values(JUSTIFY_CONTENT),
      alignItemsList: Object.values(ALIGN_ITEMS),
      alignContentList: Object.values(ALIGN_CONTENT),
      alignSelfList: Object.values(ALIGN_SELF),
      isDifferentHeight: false,
      isFlexBasisAuto: true,
      flexBasis: 0,
      flexItemList: [],
      isFlexboxDemoFloatingDisplay: true
    }
  },
  computed: {
    containerClass() {
      return this.$t('container').toLowerCase()
    },
    itemClass() {
      return this.$t('item').toLowerCase()
    },
    flexContainerStyle() {
      return `.${this.containerClass} {${objToStyle(this.flexContainer).replace(
        /\n/g,
        ''
      )}}`
    },
    flexItemStyle() {
      return this.flexItemList
        .map((flexItemItem) =>
          !(
            Object.values(flexItemItem.style).join('') ===
            [0, 0, 1, AUTO, ALIGN_SELF.AUTO].join('')
          )
            ? `.${this.itemClass}-${flexItemItem.index} {${objToStyle(
                flexItemItem.style
              ).replace(/\n/g, '')}}`
            : ''
        )
        .join('')
    },
    style() {
      return vkbeautify.css(
        `${this.flexContainerStyle}.${this.itemClass} {background-color: #ed8936;color: #fff;width: 4rem;height: 4rem;border-radius: 0.25rem;margin: 0.25rem;padding: 1rem;text-align: center;font-size: 1.25rem;cursor: pointer;}${this.flexItemStyle}`,
        '  '
      )
    },
    html() {
      return vkbeautify.xml(
        `<div class="${this.containerClass}">
          ${Array.from(
            {
              length: this.itemCount
            },
            (_, i) => i
          )
            .map(
              (i) =>
                `<div class="${this.itemClass} ${this.itemClass}-${i + 1}">${
                  i + 1
                }</div>`
            )
            .join('')}
        </div>

        <style>
${this.style}</style>`,
        '  '
      )
    }
  },
  watch: {
    'flexContainer.flexWrap'(flexWrap) {
      if (flexWrap === FLEX_WRAP.NOWRAP) {
        this.flexContainer.alignContent = ALIGN_CONTENT.STRETCH
      }
    },
    'flexContainer.alignContent'(alignContent) {
      if (alignContent === ALIGN_CONTENT.STRETCH) {
        this.flexContainer.flexWrap = FLEX_WRAP.NOWRAP
        this.itemCount = 3
      } else {
        this.flexContainer.flexWrap = FLEX_WRAP.WRAP
        this.itemCount = 12
      }
    },
    'flexContainer.alignItems'(alignItems) {
      if (alignItems === ALIGN_ITEMS.BASELINE) {
        this.isDifferentHeight = true
      } else {
        this.isDifferentHeight = false
      }
    },
    isFlexBasisAuto() {
      this.flexBasis = 0
      this.flexItem.flexBasis = AUTO
    },
    flexBasis(flexBasis) {
      if (!this.isFlexBasisAuto) {
        this.flexItem.flexBasis = `${flexBasis}%`
      }
    },
    itemCount: {
      handler(itemCount) {
        if (itemCount < 3) {
          this.itemCount = 3
        }
        if (itemCount > 12) {
          this.itemCount = 12
        }
        this.flexItemList = Array.from({ length: itemCount }, (_, i) => ({
          index: i + 1,
          isFlexBasisAuto: true,
          flexBasis: 0,
          style: {
            order: 0,
            flexGrow: 0,
            flexShrink: 1,
            flexBasis: AUTO,
            alignSelf: ALIGN_SELF.AUTO
          }
        }))
      },
      immediate: true
    }
  },
  methods: {
    onReset() {
      this.isDifferentHeight = false
      this.itemCount = 3
      this.flexItemList = Array.from({ length: this.itemCount }, (_, i) => ({
        index: i + 1,
        isFlexBasisAuto: true,
        flexBasis: 0,
        style: {
          order: 0,
          flexGrow: 0,
          flexShrink: 1,
          flexBasis: AUTO,
          alignSelf: ALIGN_SELF.AUTO
        }
      }))
      this.flexContainer = {
        display: FLEX,
        flexDirection: FLEX_DIRECTION.ROW,
        flexWrap: FLEX_WRAP.NOWRAP,
        justifyContent: JUSTIFY_CONTENT.FLEX_START,
        alignItems: ALIGN_ITEMS.STRETCH,
        alignContent: ALIGN_CONTENT.STRETCH,
        height: '100%'
      }
      this.onBoxClicked(1)
    },
    // Taken from: https://stackoverflow.com/a/45411081/7711812
    scrollParentToChild(parent, child) {
      // Where is the parent on page
      const parentRect = parent.getBoundingClientRect()
      // What can you see?
      const parentViewableArea = {
        height: parent.clientHeight,
        width: parent.clientWidth
      }

      // Where is the child
      const childRect = child.getBoundingClientRect()
      // Is the child viewable?
      const isViewable =
        childRect.top >= parentRect.top &&
        childRect.bottom <= parentRect.top + parentViewableArea.height

      // if you can't see the child try to scroll parent
      if (!isViewable) {
        // scroll by offset relative to parent
        parent.scrollTo({
          top: childRect.top + parent.scrollTop - (parentRect.top + 20),
          behavior: 'smooth'
        })
      }
    },
    onBoxClicked(index) {
      const scrollable = document.querySelector('.flex-property__scrollable')
      const scrollableItem = document.querySelector(
        `.scrollable__item--${index}`
      )
      this.scrollParentToChild(scrollable, scrollableItem)
    },
    onFlexboxDemoEnter() {
      this.isFlexboxDemoFloatingDisplay = false
    },
    onFlexboxDemoLeave() {
      this.isFlexboxDemoFloatingDisplay = true
    }
  }
})
</script>

<style>
/* purgecss start ignore */
body {
  &.light {
    --text-box: theme('colors.white');
  }
  &.dark {
    --text-box: theme('colors.gray.300');
  }
}
.prose {
  .interact {
    &__heading {
      @apply my-0;
    }
  }
  .flex-property {
    @apply flex flex-wrap;

    &__item {
      @apply mr-10 mb-5 flex-grow;
    }

    &__heading {
      @apply my-0;
    }

    &__scrollable {
      @apply overflow-auto mb-8 p-6 shadow-inner rounded;
      max-height: 24rem;
    }
  }
  .scrollable {
    &__item {
      @apply p-4 mb-5 rounded border;
      border-color: var(--inline-code-border);
    }
  }
}
/* purgecss end ignore */
</style>
