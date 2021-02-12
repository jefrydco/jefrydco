---
title: What If We Could Search Any Keyword from Any YouTube Video through Its Closed Captions Text?
description: Search any keywords from any YouTube video through their closed captions text.
summary: Imagine when we remember a moment from a YouTube video but forgot at what time it occurs. What if we could search any keywords from any YouTube video through its closed captions text?
img: /cover/2021/02/woman-in-black-off-shouldress-dress-by-ari-he.jpg
imgCreator: talescrow
postedDate: 2021-02-12T00:00:00.000Z
updatedDate: 2021-02-12T00:00:00.000Z
slug: search-closed-captions-text-youtube-video
---

<app-amp-notice :to="{ name: 'blog-slug', params: { slug: 'search-closed-captions-text-youtube-video' } }" label="What If We Could Search Any Keyword from Any YouTube Video through Its Closed Captions Text?"></app-amp-notice>

Skip to [main article](#table-of-contents).

<app-search-youtube-closed-captions-demo></app-search-youtube-closed-captions-demo>

## TLDR

Last year got an idea to create a web app that can search keyword from people speech in a YouTube video. That idea came up when I was watching web.dev Live event. Not using any sophisticated and bleeding-edge technology, only via closed captions text.

When we activate closed captions on YouTube, the page requests to an API. It responses a JSON object that we can customize into WebVTT format. Unfortunately, the YouTube closed captions API is equipped with some parameters. They have a unique identifier and expiration date.

Because of that, we can't access the URL frequently. Luckily, each YouTube video has a unique identifier on its URL. Not just URL for regular YouTube page, but also for its embedded version. We can use of puppeteer to request that embedded page and intercept the request to get the API.

We process further the closed captions data we get using several open-source NPM packages and turn that into our REST API. This API only needs a YouTube URL and a keyword. We host the API service in Vercel.

Take a look at the documentation on [Cari Teks Video API](https://github.com/jefrydco/cari-teks-video-api#readme) and a list of awesome projects that already use this REST API on [Awesome Cari Teks Video](https://awesome-cari-teks-video.netlify.app/). You can also continue to read this post to learn more about the implementation.

## Table of Contents

## Backstory

On the 30th of June until 2nd of July 2020, Chrome Developer Advocate team held a very spectacular online event for web developers. It was [web.dev Live](https://web.dev/live/).

I was watching the event until one of Chrome Developer Advocate, [Sam Dutton](https://twitter.com/sw12) shared a link in the chatbox. I navigated to that link and it turned out was a web app for search, navigate closed captions from web.dev Live event video.

The web app is called [Search web.dev Live](https://samdutton.github.io/wdl/). At first, I was impressed that we can search something from a video. Despite that was just from the closed captions. I looked over at the [GitHub link](https://github.com/samdutton/wdl) on the footer to see what's the underlying technology.

No bleeding-edge technology is used. No machine learning or complex algorithm is involved. Only a simple JavaScript, several NPM packages and closed captions files. It's intriguing to know that.

I guessed the problem with Search web.dev Live is **it only search on the web.dev Live event video**. Anyway, the web.dev Live event video was hosted on YouTube. And the closed captions files for the web app are stored on the repository itself.

"What if we could do that for all video on YouTube?", I wandered. Based on my assumption, the algorithm will look like this: 

- The JavaScript took the keyword from the input.
- Searches the keyword from all closed captions files.
- Highlights the result.

Just as effortless as like that. And it took me for a couple of searches to find that **we can get YouTube closed captions from a specific link**.

First, we must open a YouTube video then enable the closed captions to get that specific link.

<app-img src="/content/2021/02/search-closed-captions-text-youtube-video/youtube-cc-activate-by-jefrydco.jpg" alt="YouTube Closed Captions Activate"></app-img>

After enabling the closed captions feature, YouTube will make a new request from some kind of API. The response is the closed captions of the video.

<app-img src="/content/2021/02/search-closed-captions-text-youtube-video/youtube-cc-devtools-json3-by-jefrydco.jpg" alt="Devtools Opening YouTube Closed Captions Response"></app-img>

This is the example of the API URL:

```typescript{}[]
const ccUrl = 'https://www.youtube.com/api/timedtext?v=CWu29PRCUvQ&asr_langs=de%2Cen%2Ces%2Cfr%2Cit%2Cja%2Cko%2Cnl%2Cpt%2Cru&caps=asr&exp=xftt&xorp=true&xoaf=5&hl=en&ip=0.0.0.0&ipbits=0&expire=1612625982&sparams=ip%2Cipbits%2Cexpire%2Cv%2Casr_langs%2Ccaps%2Cexp%2Cxorp%2Cxoaf&signature=CC705091625358E3A3883C981A21BFC4F6E35569.77DAB826C17A839CEE703DB894D73D8AECCA0AE2&key=yt8&lang=en-GB&fmt=json3&xorb=2&xobt=3&xovt=3'
```

Let's breakdown the URL's query param into detail:

```json
{
  "v": "CWu29PRCUvQ",
  "asr_langs": "de,en,es,fr,it,ja,ko,nl,pt,ru",
  "caps": "asr",
  "exp": "xftt",
  "xorp": "true",
  "xoaf": "5",
  "hl": "en",
  "ip": "0.0.0.0",
  "ipbits": "0",
  "expire": "1612625982",
  "sparams": "ip,ipbits,expire,v,asr_langs,caps,exp,xorp,xoaf",
  "signature": "CC705091625358E3A3883C981A21BFC4F6E35569.77DAB826C17A839CEE703DB894D73D8AECCA0AE2",
  "key": "yt8",
  "lang": "en-GB",
  "fmt": "json3",
  "xorb": "2",
  "xobt": "3",
  "xovt": "3"
}
```

We can get some of the understandable key-value pairs here:

- `v` means YouTube video identity.
- `hl` if I'm not mistaken, it stands for host language. It is common for Google-related API service to use this key. This key is for defining something related to language setting. For this case, it seems for the language of the closed captions.
- `expire` when will the API request expired. It seems the value is in seconds unit.
- `signature` some random identifier of the request. In my opinion, the value of this key defines which request is eligible to process. The expiration date seems also has connection to this identifier. I try to remove this identifier when accessing the API but it responses failed.
- `fmt` is the response format. By default, the API response is formatted as `json3`. My bet is the value can be customized. I try another closed captions format, such as `vtt` and it does work.

We still have a bunch of more, but those are the most important key values we need.

<app-img src="/content/2021/02/search-closed-captions-text-youtube-video/youtube-cc-devtools-vtt-by-jefrydco.jpg" alt="Devtools Opening YouTube Closed Captions Response with WebVTT Format"></app-img>

Viola! I think we use that API URL to build our general YouTube video search through closed captions web app.

---

Before we continue, let's first take a glance look at the content of WebVTT format:

```vtt
WEBVTT
Kind: captions
Language: en

00:00:00.357 --> 00:00:01.822
- [Narrator] There is
a growing feeling today

00:00:01.822 --> 00:00:04.699
that something is wrong with
our system of education.
```

WebVTT is just a regular text with some specific content formatting. As an outline, **WebVTT consist of 2 things**. They are **the header and the cue**.

```vtt
WEBVTT
Kind: captions
Language: en
```

**The header contains metadata** about the closed captions itself, like the content language of WebVTT or the creator.

```vtt
00:00:00.357 --> 00:00:01.822
- [Narrator] There is
a growing feeling today

00:00:01.822 --> 00:00:04.699
that something is wrong with
our system of education.
```

**The cue can be divided into 3 parts**, they are **start time, end time and the text**. The text is the closed captions text that will be shown on the video. The start time represents when will the text is shown. The last part is the end time, indicate when will the text disappears.

---

## Ingredients

Here are several key NPM packages we can use to create the API:

- [@vercel/node](https://github.com/vercel/vercel), we host the API on Vercel so we need this package to build and serve our API there.
- [chrome-aws-lambda](https://github.com/alixaxel/chrome-aws-lambda), Vercel Serverless Function under the hood is run on AWS Lambda. It has a limitation on how big the function size. If I'm not mistaken, the maximum size is around **50MB** and unzipped size is around **250MB**. To comply with that limitation, we can't use regular puppeteer package. Because it will download the full size of the chrome browser when installed. Instead, we use puppeteer-core and with this package as companion. This package will install smaller size of chrome because it is compressed using [Brotli algorithm](https://brotli.org/).
- [flexsearch](https://github.com/nextapps-de/flexsearch), we want to create a search API, so we need to have searching mechanism. Even though we can use native `Array.prototype.filter` method, in my opinion, it will be better if we could increase the performance by using a 3rd party library. Search web.dev Live web app also uses this package.
- [get-urls](https://github.com/sindresorhus/get-urls), this package is very useful to extract metadata link from a string. Specifically to get the YouTube logo URL.
- [isomorphic-fetch](https://github.com/matthew-andrews/isomorphic-fetch), we will use this package to fetch the closed captions data from YouTube REST API.
- [joi](https://github.com/sideway/joi), this package is for object validation. It makes sure all the data is in the correct format.
- [pino-logflare](https://github.com/Logflare/pino-logflare), a log is a very crucial part of any technology. We can use that to debug and fix any issue. However, Vercel has [different behaviour](https://vercel.com/docs/platform/limits#logs) of storing the log. In short, it's quite difficult to get insightful information from the log because of Vercel's limitation. Luckily, Vercel also provides a feature called [Log Drain](https://vercel.com/blog/log-drains). In a nutshell, instead of storing log in Vercel server, they will pipe the log directly into another service that specializes in storing app logs. One of them is [Logflare](https://logflare.app/). This package integrates pino express logger and Logflare.
- [puppeteer-core](https://github.com/puppeteer/puppeteer), puppeteer is headless chrome, we need this package to open the YouTube page.
- [string-strip-html](https://github.com/codsen/codsen/tree/main/packages/string-strip-html), sometimes the closed captions contain HTML code. We need this package to remove them all.
- [subtitle](https://github.com/gsantiago/subtitle.js), we get the closed captions from YouTube API in the form of [WebVTT](https://en.wikipedia.org/wiki/WebVTT). This package is useful for parse and converts that format into a JavaScript object.
- [typescript](https://github.com/microsoft/TypeScript), enhanced version of JavaScript.

For more detail packages please take a look on the package.json file on this repository, [Cari Teks Video API](https://github.com/jefrydco/cari-teks-video-api/blob/main/package.json).

## Modules

We already have all the ingredients. We will create 2 API endpoints, the first one is the `/` and the second one is the `/search`. **Index endpoint is only used to fetch the closed captions data from YouTube**. For **search endpoint is for search**. In this post, we will discuss more for search endpoint.

<app-img src="/content/2021/02/search-closed-captions-text-youtube-video/youtube-cc-api-diagram-by-jefrydco.jpg" alt="YouTube Closed Captions API Diagram"></app-img>

Based on the diagram above, we can split our REST API into 8 smaller modules.

### Guardian

As its name suggests, the function of this module is the guardian. Which is to make sure all the incoming parameter and the data containing are correct. We use Joi as our guardian.

In our case, the incoming parameter is from query param.

```typescript{}[] twoslash
import joi from 'joi'

const indexQuery = joi.object({
  url: joi.string().required(),
  page: joi.string().optional(),
  size: joi.string().optional(),
  paginated: joi.number().integer().allow(0, 1).optional()
})

const searchQuery = indexQuery.keys({
  q: joi.string().min(3).required(),
  marked: joi.number().integer().allow(0, 1).optional()
})
```

Following our REST API endpoint, there are 2 kinds of query params. The first one is for index and the second one is for search. The search query params are just extending the index.

If you want to know what is the function of each query param. Please learn more on the [Cari Teks Video API Docs - Request](https://github.com/jefrydco/cari-teks-video-api#request).

### Retriever

Retriever is used to retrieve the data from query param that passed on the REST API. Like we did on the Guardian, we also need to split the retriever into 2 kinds of function, index and search.

For `url`, we pass directly the YouTube URL to the REST API. But if we open the regular YouTube page, it will take a longer time. Instead, we can use the YouTube embeded page. So we need to convert that regular YouTube URL into its embed version.

We need to get the video identity from the URL. We can use a [Regular Expression](https://en.wikipedia.org/wiki/Regular_expression) for that. Here the RegEx I use to extract video identity from YouTube URL:

```typescript{}[] twoslash
const youtubeUrl = 'https://www.youtube.com/watch?v=okpg-lVWLbE'
const result = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/gi
  .exec(youtubeUrl)

let id = ''

if (Array.isArray(result) && result.length > 0) {
  id = result[1]
}
```

A quite long RegEx but it does work. I get that RegEx from this StackOverflow thread, [Regex for YouTube ID](https://stackoverflow.com/a/6904504).

After we get the video identity then we have to pass it to the YouTube embed URL.

```typescript{}[] twoslash
declare const id: string;
/// ---cut---
// previous code

const youtubeEmbedUrl = `https://www.youtube.com/embed/${id}?hl=en&cc_lang_pref=en&cc_load_policy=1&autoplay=1`
```

We also add several parameters to that URL.

- `hl`, same as `hl` from YouTube Closed Captions API we already discussed above. It stands for the host language. The function is for setting the player interface language.
- `cc_lang_pref`, it specifies the default language for displaying closed captions.
- `cc_load_policy`, makes the closed captions automatically shown by default if the value is `1`.
- `autoplay`, set to play the video automatically if the value is `1`.

### Fetcher

Probably this module is the most time consuming to make. It contains a function to fetch the YouTube Closed Captions API, index fetcher and search fetcher.

#### YouTube Closed Captions Fetcher

This fetcher is actually used in index endpoint. But to get a better understanding of how we get the closed captions data, we should get into this.

We already know the algorithm to get the YouTube Closed Captions API URL. But we need to convert that algorithm into real code. We use puppeteer and Chrome AWS Lambda to do that. Let's take a look the snippet below:

```typescript{6-8,13,18-24,27-29}[] twoslash
declare const youtubeEmbedUrl: string

/// ---cut---
import chrome from 'chrome-aws-lambda'
import puppeteer from 'puppeteer-core'

async function getYoutubeCC(url: string) {
  const browser = await puppeteer.launch({
    args: chrome.args,
    executablePath: await chrome.executablePath,
    headless: chrome.headless
  })

  const page = await browser.newPage()

  await page.setRequestInterception(true)

  let ccUrl = ''

  page.on('request', (request) => {
    if (request.resourceType() === 'xhr') {
      const _ccUrl = request.url()
      if (_ccUrl.includes('https://www.youtube.com/api/timedtext')) {
        ccUrl = _ccUrl.replace('json3', 'vtt')
      }
    }
    request.continue()
  })

  await page.goto(url, {
    waitUntil: 'networkidle0'
  })

  return ccUrl
}

(async () => {
  const ccUrl = await getYoutubeCC(youtubeEmbedUrl)
})()
```

We launch a browser instance and then pass the options to use the Chrome AWS Lambda configuration. Besides that, we also initiate a new empty page.

To get the YouTube Closed Captions API, we have to intercept the request. We can do that by calling `setRequestInterception` from `page` instance with `true` argument. Now, we can listen to the `request` event. After that, we need to filter out the request by its resource type. For this case we have to get any `xhr` request.

Then we also check the URL whether its YouTube Closed Captions API or not. If its found, we replace the `json3` format to `vtt`. This callback event is called on every request browser made. So we need to manually call `continue` method to call the next request event.

The last part of this section is calling the `goto` method with YouTube embed URL we already form on previous section as the first argument. We also pass the `waitUntil` option with value `networkidle0`. The option means that we will wait the page until its fully loaded.

#### Index Fetcher

After we get the closed captions url from [YouTube Closed Captions Fetcher](#youtube-closed-captions-fetcher), we have to fetch the WebVTT data. That is the function of this fetcher.

```typescript{4,6-8,12-13,17,21-23}[] twoslash
declare function getYoutubeCC(url: string): Promise<string>

declare type CCNode = {
    type: 'cue'
    data: {
      start: number
      end: number
      text: string
      settings?: string
    }
}

declare type CCNodeList = CCNode[]

declare type Vtt = {
  id?: number
  start: number
  end: number
  text: string
}

declare function vttToJson(vtt: string): CCNodeList

declare function stripHtml(string: string): string

declare function stripWhitespaceNewLine(string: string): string

declare function toSecond(timestamp: number): number

declare const ccUrl: string

/// ---cut---
(async () => {
  // previous code

  const data: Vtt[] = await fetch(ccUrl)
    .then((ccResponse) => {
      if (ccResponse.ok) {
        return ccResponse.text()
      }
      return ''
    })
    .then((ccText) => {
      const ccStriped = stripHtml(ccText)
      const ccJson = vttToJson(ccStriped)

      const ccData = ccJson
        .filter((item) => {
          return item.type === 'cue'
        })
        .map((item) => {
          return {
            start: toSecond((item as CCNode).data.start || 0),
            end: toSecond((item as CCNode).data.end || 0),
            text: stripWhitespaceNewLine((item as CCNode).data.text)
          }
        }) as Vtt[]

      return ccData
    })
})()
```

> Note: `CCNode` is a type declaration I created for demo purpose. The original type declaration from subtitle package is `NodeCue`.

We use `fetch` method to get the data. If everything is good, we will call the `text` method and get the closed captions data in form of text. If not, we just return an empty string.

Usually, the closed captions contain HTML code. So we need to remove that by calling the `stripHtml` method. The return is still a string so we need to convert that into an easier form to interact with.

We convert that into a JSON object by calling the `vttToJson` method. Behind the scenes, that method uses `parseSync` from [subtitle](https://github.com/gsantiago/subtitle.js) package. It returns an array of object.

Sometimes the item is mixed up between header and cue type. The only thing we need is the cue, so we should filter that out. After that, we map through the array to get the data we need. They are start time, end time and closed captions text.

Start time and end time originally parsed as millisecond but **YouTube URL scheme mostly use time in seconds format**. We have to convert them into the right format using `toSecond` utils method. It just a simple method that round division of millisecond with 1000.

For the text property, it often contains unnecessary whitespace and new line at the end of the sentence. We can clean them up using `stripWhitespaceNewLine` utils method.

#### Search Fetcher

This fetcher is used in search endpoint. It fetches the JSON response from index endpoint.

```typescript{}[] twoslash
declare type Vtt = {
  id?: number
  start: number
  end: number
  text: string
}

declare type FetcherReturnType = {
  data: Vtt[]
}

declare const youtubeUrl: string

/// ---cut---
(async () => {
  // previous code

  const indexEndpoint = `https://cari-teks-video-api.vercel.app/api/?url=${youtubeUrl}&paginated=0`

  const list: FetcherReturnType = await fetch(indexEndpoint)
    .then((response) => {
      if (response.ok) {
        return response.json()
      }
      return []
    })
    .then((data: Vtt[]) => {
      return {
        data
      }
    })
})()
```

By default when we request to index endpoint, the response will be paginated. So we need to pass `paginated=0` to get the full result.

### ID Generator

FLexsearch requires each item in the data to have a unique identity. This module generates it for them.

```typescript{}[] twoslash
declare type Vtt = {
  id?: number
  start: number
  end: number
  text: string
}

declare const list: Vtt[]

/// ---cut---
(async () => {
  // previous code

  const generatedIdList = list.map((item, id) => {
    return {
      ...item,
      id
    }
  })
})()
```

It maps the existing object and adds new property for identity to them. The identity value is taken from the array index of each item.

### Finder

We use an NPM package called Flexsearch to search for any keyword. Based on benchmark stated on its GitHub page, [Flexsearch](https://github.com/nextapps-de/flexsearch#webs-fastest-and-most-memory-flexible-full-text-search-library-with-zero-dependencies) is the web's fastest and most memory-flexible full-text search library with zero dependencies.

```typescript{7-10,13,17}[] twoslash
declare type Vtt = {
  id?: number
  start: number
  end: number
  text: string
}

declare const generatedIdList: Vtt[]

/// ---cut---
import Flexsearch from 'flexsearch'

(async () => {
  // previous code

  const index = Flexsearch.create<Vtt>({
    doc: {
      id: 'id',
      field: ['text']
    }
  })
  generatedIdList.forEach((item) => {
    index.add(item)
  })

  const keyword = 'education'
  const resultList = await index.search(keyword)
})()
```

First, we must build an index by calling `create` method. We pass some configurations like what is the name of the identity key and what is the key name that Flexsearch need to look.

After that, we loop through the list and add each item to the index by calling `add` method. If we want to search a keyword, we just call `search` method from `index` object with the keyword as a parameter. The return of this call is the filtered list matched the keyword.

### Highlighter

Unfortunately, Flexsearch doesn't come with a built-in highlighter nor the custom one. We need to implement that ourself. Because of the return of `search` is filtered list, we just need to **loop through that list and wrap the keyword with some HTML tag**.

```typescript{5,11,15-18}[] twoslash
declare type Vtt = {
  id?: number
  start: number
  end: number
  text: string
}

declare const resultList: Vtt[]

declare const keyword: string

/// ---cut---
(async () => {
  // previous code

  function replacer(match: string) {
    return `<mark class="cvt-highlight">${match}</mark>`
  }

  const highlightedList: Vtt[] = resultList.map((item) => {
    let text = ''
    if (item.text.includes(keyword)) {
      text = `${item.text}`.replace(new RegExp(`${keyword}`, 'gi'), replacer)
    } else {
      const multipleWords = keyword.match(/\S+/g)
      if (multipleWords) {
        text = `${item.text}`.replace(
          new RegExp(`${multipleWords.join('|')}`, 'gi'),
          replacer
        )
      }
    }

    return {
      ...item,
      text
    }
  })
})()
```

If the keyword is a single word keyword, we use `String.prototype.includes` method to check whether the text contains the corresponding keyword. If it is found then we do wrapping mechanism.

Meanwhile, if the keyword consists of multiple words we can't use that method. Instead, we concatenate each word into a RegEx format. Let say if the keyword is `current education`, we turn that into `/current|education/gi`. So each word will get the wrap itself.

### Paginator

This module turns a full array into paginated version. I found a very concise answer from StackOverflow that help me get through this, [Paginate Javascript Array](https://stackoverflow.com/a/42761393).

```typescript{}[] twoslash
declare type Vtt = {
  id?: number
  start: number
  end: number
  text: string
}

declare const highlightedList: Vtt[]

/// ---cut---
(async () => {
  // previous code

  const pageNumber = 1
  const pageSize = 10

  const paginatedList = highlightedList
    .slice((pageNumber - 1) * pageSize, pageNumber * pageSize)
})()
```

The only parameter we need is page number and page size. The page number is a current page that will return and page size is the amount of item will be returned.

### ID Remover

The identity added from ID Generator module only useful to build the index for searching purpose. We don't need it for now and can safely be removed.

```typescript{}[] twoslash
declare type Vtt = {
  id?: number
  start: number
  end: number
  text: string
}

declare const paginatedList: Vtt[]

/// ---cut---
(async () => {
  // previous code

  const removedIdList = paginatedList.map((item) => {
    delete item.id
    return item
  })
})()
```

To remove the identity, we can map the list into a new object and delete the `id` property.

### Formatter

The last module is formatter. We won't discuss into detail on how this formatter implemented. But the idea of this module is to generate a link for previous, next, first and last page.

```typescript{}[] twoslash
declare type Vtt = {
  id?: number
  start: number
  end: number
  text: string
}

declare type FormatterReturnType = {
  first: string
  last: string
  prev: string
  next: string
  total: number
  page: number
  data: Vtt[]
}

declare enum PaginationUrlType {
  First,
  Last,
  Prev,
  Next
}

declare type FormatterOptions = {
  reqUrl: string
  page: number
  size: number
  dataLength: number
}

declare const removedIdList: Vtt[]

declare const pageNumber: number

declare const pageSize: number

declare function getPaginationUrl(type: PaginationUrlType, options: FormatterOptions): string

/// ---cut---
(async () => {
  // previous code

  const options: FormatterOptions = {
    reqUrl: 'https://cari-teks-video-api.vercel.app/api',
    page: pageNumber,
    size: pageSize,
    dataLength: removedIdList.length
  }

  const response: FormatterReturnType = {
    first: getPaginationUrl(PaginationUrlType.First, options),
    last: getPaginationUrl(PaginationUrlType.Last, options),
    prev: getPaginationUrl(PaginationUrlType.Prev, options),
    next: getPaginationUrl(PaginationUrlType.Next, options),
    total: options.dataLength,
    page: options.page,
    data: removedIdList
  }
})()
```

The `getPaginationUrl` method receives 2 arguments, the first one is enum. It is for identifying which pagination we currently dealing with. The second argument is the options. Options consist of:

- `reqUrl`, current request URL. If the request to index endpoint, that would be `/`. And if it is requested to search endpoint, that would be `/search`.
- `page`, current result page, by default it will return the first page.
- `size`, how many items should return to the API, by default this would be 10 items.
- `dataLength`, how many items the data before paginated.

---

This article only describes the essential part from the whole source code. If you want to know how the real implementation, please learn more on the GitHub repository, [Cari Teks Video API](https://github.com/jefrydco/cari-teks-video-api#readme).

## Disclaimer

1. "This method" refers to all steps or explanations I write on this article.
2. "The API" refers to all the API available in https://cari-teks-video-api.vercel.app/api.
3. All of this method is pure entirely **for research and experimental purpose**.
4. If YouTube decides to change the behaviour or use some other way, this method **probably couldn't work anymore**.
5. Since the API is deployed on free version of Vercel, they do have a restriction for function invocation. If suddenly the API inaccessible, it seems it is already hit the limit.
6. Because of point number 4 and 5, I **can't guarantee that the API will work forever**. But I do regularly check whether it's still fine or not.
7. Please **don't use it on production**. I won't responsible for any side effect usage of the API on production.
8. YouTube already have [YouTube Data API for Captions](https://developers.google.com/youtube/v3/docs/captions) to provide the official way of accessing closed captions. Please **use that instead of this if you want to use a similar feature on production**.
9. If you found any bug, please submit an issue on the GitHub repository, [Cari Teks Video API](https://github.com/jefrydco/cari-teks-video-api#readme).

## Reference

- [GitHub: Cari Teks Video API Docs](https://github.com/jefrydco/cari-teks-video-api#readme)
- [GitHub: Search web.dev Live by Sam Dutton](https://github.com/samdutton/wdl)
- [Google Developers Portal: YouTube Data API for Captions](https://developers.google.com/youtube/v3/docs/captions)
- [StackOverflow: Paginate Javascript Array](https://stackoverflow.com/a/42761393)
- [StackOverflow: Regex for YouTube ID](https://stackoverflow.com/a/6904504)
