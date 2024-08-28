# Vertical Align

## Problems

### `input` tag work well except on ipad.

-   When a value is filled in, its height increases.

## Steps

1. The `vertical-align` sets vertical alignment of `inline` `inline-block` `table-cell`.
2. In this case, `input`'s parent element is `inline-block`
3. The issue was resolved by adding the vertical-align: middle property in CSS.

> Reference: [MDN - vertical-align](https://developer.mozilla.org/en-US/docs/Web/CSS/vertical-align)

### Another Problem Appears

-   Why does this issue occur only on iPad Pro devices?
-   Initially, vertical-align is set to baseline.
-   I suspect this might be influencing the problem, but I'm not certain.

## Solution

-   Adding the vertical-align property to the parent element resolved the issue.
