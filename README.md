# Em

Sass function and mixin to convert px in em.

Compatibility: Sass 3.2+ (3.3+ for the mixin) and LibSass

---

## Install

Download [`_em.scss`](https://raw.githubusercontent.com/pierreburel/sass-em/master/_em.scss) or install with [Bower](http://bower.io/):

```
bower install sass-em
```

---

## Usage

Import `_em.scss` and use the `em` mixin or function.  

The function takes at least 2 parameters: the value(s) (px, mixed) and the context (px).  
There can be multiple values (eg. multiple box shadow), but **the last parameter must be the context**.  

The mixin takes only 2 parameters: the properties (map of `property: value`) and the context (px). It can be used to convert the values of multiple properties with the same context.

## Example :

```scss
@import "em";

h1 {
  font-size: em(24px, 16px); // Simple
  border-bottom: em(1px solid black, 24px); // Shorthand
  box-shadow: em(0 0 2px #ccc, inset 0 0 5px #eee, 24px); // Multiple values
  // Mixin (Sass 3.3+)
  @include em((
    margin: 20px 10px,
    padding: 10px
  ), 24px);
}
```

That will output :

```css
h1 {
  font-size: 1.5em;
  border-bottom: 0.04167em solid black;
  box-shadow: 0 0 0.08333em #ccc, inset 0 0 0.20833em #eee;
  margin: 0.83333em 0.41667em;
  padding: 0.41667em;
}
```
