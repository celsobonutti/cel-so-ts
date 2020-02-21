---
title: 'ReasonML and Parcel (or zero-config type-safe React)'
date: '2020-02-21T03:35:37.121Z'
description: How to setup a simple ReasonReact app using Parcel and Bucklescript
---

>Please read this in a computer, the code blocks are breaking the responsiveness. I'll fix this ASAP.

I would like to start this by saying that I'm obviously no expert on either ReasonML or Javascript bundlers: for the last 2 years I've been using the (great) create-react-app boilerplate and never thought on moving away... until now. Javascript and Typescript also always met my needs, until JSs constant unexpected behavior and TSs real bad type inference started bothering me for real.

I'd also like to tell you that I am, by no means, a expert on front-end development. I've started on 2017 and, for almost an year, worked exclusively with ASP.NET Webforms and Django templates.

With that said, let's dive into the

<div
  style={{
    display: "flex",
    justifyContent: "center",
    marginBottom: "1.56rem"
  }}
>
  <span style={{
    backgroundImage: "linear-gradient(to left, violet, indigo, blue, green, yellow, orange, red)",
    backgroundClip: "text",
    color: "transparent",
    fontSize: "3em",
    lineHeight: "initial",
    textAlign: "center",
  }}>
    Wonderful World of ReasonML
  </span>
</div>

Let's start by creating a folder, then initializing a npm project. Name it whatever you want, I'll name it "nice-memes"!

```
mkdir nice-memes
cd nice-memes
npm init -y
```

Alright, now that we have `package.json`, let's install Parcel as a dev dependency:

```
npm i -D parcel-bundler
```

And put this in your `scrips` on `package.json`:

```json
  "scripts": {
    "start": "NODE_ENV=development parcel src/index.html --open --port 3000"
  },
```

If you try to run right now... It will break. Why? Because there's nothing on index.html yet, obviously 🤷‍♂️
So... let's create our files! Start creating a `src` folder, an `index.html` and an `Index.re` files:

```bash
mkdir src
cd src
touch index.html
touch Index.re
```

Explaining how to write a basic HTML5 file is out of the scope of this post, but your body has to look like this:

```html
<body>
  <div id="root"></div>
  <script src="./Index.re"></script>
</body>
```

> Wait... WHAT??? Are you telling me that I can just import my Reason file into HTML????

That was _exactly_ what I thought at the time I read the Parcel documentation on ReasonML, and... it works!
I mean, if you run `npm start` right now, you'll only see a white screen, but we're going to take care of that.

Let's start by installing our dependencies, so run `npm i -S react react-dom reason-react`. If you try to run it right now, you'll get an error related to `bsb`. Of course! How could we run ReasonML on the browser without [bucklescript](https://bucklescript.github.io/)?
Just run `npm i -D bs-platform`, create a `bsconfig.json` in your project's root directory and put the following content in it:

```json
{
  "name": "professor-escroto",
  "reason": { "react-jsx": 3 },
  "bsc-flags": ["-bs-super-errors"],
  "sources": [
    {
      "dir": "src",
      "subdirs": true
    }
  ],
  "package-specs": [
    {
      "module": "commonjs",
      "in-source": true
    }
  ],
  "suffix": ".bs.js",
  "namespace": true,
  "bs-dependencies": [
    "reason-react"
  ],
  "refmt": 3
}
```

One more time, try to `npm start` your way to glory! You'll notice that it runs, your Reason file is built, and... you still have a blank page. Because we didn't write anything on the `Index.re`, so open it and be ready for some exciting ReasonReact action, putting the following code in it:

```reason
module App = {
  [@react.component]
  let make = () => {
    <div>
      <p>
        "I like high quality memes!" -> React.string
      </p>
    </div>
  }
}

ReactDOMRe.renderToElementWithId(
  <App />,
  "root",
);
```

Check your browser and... Ta-da, you like high quality memes!

That's all, folks. Thanks for your attention!