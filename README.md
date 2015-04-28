# Em

Sass function and mixin to convert px in em.

Demo: [Sassmeister](http://sassmeister.com/gist/4481fa0aeeaf49ea9325) / [Codepen](http://codepen.io/pierreburel/pen/dPwXrr)

Compatibility: Sass 3.2+ (3.3+ for the mixin) and LibSass

See also: https://github.com/pierreburel/sass-rem

---

## Install

Download [`_em.scss`](https://raw.githubusercontent.com/pierreburel/sass-em/master/_em.scss) or install with [Bower](http://bower.io/) or [npm](https://www.npmjs.com/):

```
bower install sass-em
```

### npm

```
npm install sass-em
```

---

## Usage

Import `_em.scss` and use the `em` mixin or function.  

The function takes at least 2 parameters: the value(s) (px, mixed) and the context (px).  
There can be multiple values (eg. multiple box shadow), but **the last parameter must be the context**.  

The mixin takes only 2 parameters: the properties (map of `property: value`) and the context (px). It can be used to convert the values of multiple properties with the same context.

## Example

```scss
@import "em";

$base-font-size: 16px;
$h1-font-size: 24px;

h1 {
  font-size: em($h1-font-size, $base-font-size); // Simple
  border-bottom: em(1px solid black, $h1-font-size); // Shorthand
  box-shadow: em(0 0 2px #ccc, inset 0 0 5px #eee, $h1-font-size); // Multiple values
  // Mixin (Sass 3.3+)
  @include em((
    margin: 20px 5%,
    padding: 10px
  ), $h1-font-size);
}
```

That will output :

```css
h1 {
  font-size: 1.5em;
  border-bottom: 0.04167em solid black;
  box-shadow: 0 0 0.08333em #ccc, inset 0 0 0.20833em #eee;
  margin: 0.83333em 5%;
  padding: 0.41667em;
}
```
