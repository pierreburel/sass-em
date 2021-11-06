# Em

Sass function and mixin to convert px in em.

**Breaking change in 2.0**: now using [Sass Modules](https://sass-lang.com/blog/the-module-system-is-launched), using `@use` and `em` is renamed to `em.convert`. You could still use `@import` with no changes (see usage below), but **if you need LibSass and Ruby Sass support (both deprecated), you should stay on 1.0** (which works fine) or use the [PostCSS](https://github.com/pierreburel/postcss-em) version.

Compatibility: [Dart Sass](https://sass-lang.com/dart-sass) only.

PostCSS version: https://github.com/pierreburel/postcss-em

See also: https://github.com/pierreburel/sass-rem

---

## Installation

Install with [Yarn](https://yarnpkg.com/) or [npm](https://www.npmjs.com/):

* `yarn add sass-em`
* `npm install sass-em`

---

## Usage

The `em.convert` function takes at least 2 parameters: the value(s) (px, mixed) and the context (px).
There can be multiple values (eg. multiple box shadow), but **the last parameter must be the context**.

The `em.convert` mixin takes only 2 parameters: the properties (map of `property: value`) and the context (px). It can be used to convert the values of multiple properties with the same context.

Import in your project depending of your setup:

```scss
@use "em";
// or @use "~sass-em" as em;
// or @use "../node_modules/sass-em" as em;

$base-font-size: 16px;
$h1-font-size: 24px;

.demo {
  font-size: em.convert($h1-font-size, $base-font-size); // Simple
  border-bottom: em.convert(1px solid black, $h1-font-size); // Shorthand
  box-shadow: em.convert(0 0 2px #ccc, inset 0 0 5px #eee, $h1-font-size); // Multiple values
  // Multiple properties
  @include em.convert((
    margin: 20px 5%,
    padding: 10px
  ), $h1-font-size);
}
```

Will output :

```css
.demo {
  font-size: 1.5em;
  border-bottom: 0.0416666667em solid black;
  box-shadow: 0 0 0.0833333333em #ccc, inset 0 0 0.2083333333em #eee;
  margin: 0.8333333333em 5%;
  padding: 0.4166666667em;
}
```

## *But it was shorter before!*

It was.

But You can change the namespace to something shorter and use `em` function and mixin instead of `convert`:

```scss
@use "em" as to; // Because why not?

.demo {
  font-size: to.em(24px, 16px);
}
```

Or you can even load the library globally (but beware of conflicts, avoided by the idea of modules):

```scss
@use "em" as *;

.demo {
  font-size: em(24px, 16px);
}
```

And if you just don't want to use Sass Modules, you can still use `@import` with `em` function and mixin as before:

```scss
@import "sass-em";

.demo {
  font-size: rem(24px);
}
```
