---
title: How to Fix CORS Issue in Firebase or Google Cloud Storage
description: The solution of fixing CORS issue in Firebase or Google Cloud Storage
summary: I was fixing a long-abandoned bug in my project. The error was quite simple actually. It was the image stored in Firebase Cloud Storage cannot be retrieved through AJAX request.
img: /cover/2019/04/fix-cors-firebase-google-cloud-image-by-toa-heftiba.jpg
imgCreator: heftiba
postedDate: 2019-04-27T17:37:21.057Z
updatedDate: 2019-04-27T17:37:21.057Z
slug: fix-cors-issue-firebase-google-cloud
id: fix-cors-issue-firebase-google-cloud
---

I was fixing a long-abandoned bug in my project. The error was quite simple actually. It was the image stored in Firebase Cloud Storage cannot be retrieved through AJAX request. I checked on the JavaScript console and this error appeared:

> Access to fetch at 'IMAGE-URL-FROM-FIREBASE-CLOUD -STORAGE' from origin 'http://localhost:3000' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.

After several attempts, I got the answer from StackOverflow, [Firebase Storage and Access-Control-Allow-Origin](https://stackoverflow.com/a/37765371/7711812).

To solve that problem, we need to access [Google Cloud Console](https://console.cloud.google.com/home/dashboard). Then, select the project that I want to solve. Activate cloud shell by clicking the terminal icon on the top right corner.

A terminal window will arise in the bottom. Then, run this command inside that terminal:

```bash
$ nano cors.json
```

An editor inside the terminal will appear. Type this code into it:

```json
[
  {
    "origin": ["*"],
    "method": ["GET"],
    "maxAgeSeconds": 3600
  }
]
```

We can change the `*` symbol into other URL. For instance, if we want the image can be accessed only from this blog URL, We can change the `*` into `https://jefrydco.id`.

Then press `CTRL + X` followed by `y`.

After that, run this command:

```bash
$ gsutil cors set cors.json gs://YOUR-BUCKET-PROJECT-URL
```
If its success, the terminal display will be like this:

```bash
jefrydco@cloudshell:~ (PROJECT-ID)$ gsutil cors set cors.json gs://YOUR-BUCKET-PROJECT-URL
Setting CORS on gs://YOUR-BUCKET-PROJECT-URL/...
jefrydco@cloudshell:~ (PROJECT-ID)$
```

The bucket URL can be found from Firebase dashboard on Storage menu like this image:

<app-img src="/content/2019/04/firebase-storage-image-by-jefrydco.jpg" alt="Firebase Storage Image"/>

Or from Google Cloud Console dashboard on Storage menu like this image:

<app-img src="/content/2019/04/google-cloud-storage-image-by-jefrydco.jpg" alt="Google Cloud Storage" />
