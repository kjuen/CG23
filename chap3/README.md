# Chapter 3: Introduction to Javascript

Videos of this chapter: see Moodle-Page

The goal of this chapter is to learn enough Javascript to use the three.js library. The
slides summarize the required Javascript features and contain some exercises.
For self study the tutorials on Mozilla
MDN web docs are recommended:

* Mozilla MDN web docs - another very good reference:
[https://developer.mozilla.org](https://developer.mozilla.org)

## What to learn
Here is a guideline what to go through in the MDN web docs:

* The basics of HTML:
[https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Getting_started](https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Getting_started)

* How to open the dev tools of a browser: we don't need DOM or CSS tools, just the
  Javascript console and ideally also the Javascript debugger:
[https://developer.mozilla.org/en-US/docs/Learn/Common_questions/What_are_browser_developer_tools](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/What_are_browser_developer_tools)

* All of [https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps)

* All of [https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks)

* The first three sections of [https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects)


## Further links

* *Eloquent JavaScript* - A well written, poplar and free, though quite lengthy, JavaScript text book:
[https://eloquentjavascript.net](https://eloquentjavascript.net)

* *JavaScript for impatient programmers* - a very good Javascript reference:
[https://exploringjs.com/impatient-js/toc.html](https://exploringjs.com/impatient-js/toc.html)

* Firefox developer tools:
[https://developer.mozilla.org/en-US/docs/Tools](https://developer.mozilla.org/en-US/docs/Tools)

* Javascripture - (inofficial) Javascript API documentation:
[https://www.javascripture.com/](https://www.javascripture.com/)

* More about console.log and friends:
[Mastering JS console.log like a Pro](https://medium.com/javascript-in-plain-english/mastering-js-console-log-like-a-pro-1c634e6393f9)

* A very good curated link list:
  [33 Concepts Every JavaScript Developer Should Know](https://github.com/leonardomso/33-js-concepts)

## Coding style

  The following coding style guide is required for the lab work. Failure to stick to the
  style guide will lead to the subtraction of grade points:

  1. **No errors or warnings:** Your code must not create errors or warnings in the browser console.
  2. **No junk files:** Include only those files in your project that are necessary. No useless junk files.
  3. **No debugging code:** Remove all debugging statements like `console.log`
        calls or auxiliary axes before submitting the code.
  4. **Indentation:** All code must be properly and consistently indented.
      Do not mix white space and tabs for indentation.
  5. **Use consistent formatting:** See the corresponding section in [Clean Code Javascript](https://github.com/ryanmcdermott/clean-code-javascript#formatting)
       for further details.
  6. **Variable declaration:** Use `const` to declare variables where ever possible.
      Otherwise use `let`. Don't use `var`. Compare the [Google style guide](https://google.github.io/styleguide/jsguide.html#features-local-variable-declarations).
  7. **Variable names:** Use descriptive variable names.
      ```javascript
      const a = [1,2,3];   // bad

      const ballSpeed = [1,2,3];   // good
      ```
     An exception to this rule can be the naming of loop variables in short `for`-loops.
     See the corresponding section in
     [Clean Code Javascript](https://github.com/ryanmcdermott/clean-code-javascript#variables).
  8. **No unused variables:** Don't define variables that are not used in the application.
  9. **No magic numbers:** Store numeric values in reasonably named variables
      instead of using them directly:
      ```javascript
      speed.multiplScalar(1-0.2*dt) ;   // bad

      const rollFric = 0.2;
      speed.multiplyScalar(1-rollFric*dt);   // good
      ```
  10. **Minimal number of global names:**
      Keep the number of names in the global
      scope minimal. In particular collect configuration variables in an object:
      ```javascript
        const ballSpeed = 5;
        const ballRadius = 1;     // bad

        const PongApp = {         // better
          ballSpeed: 5,
          ballRadius: 1
        };
      ```
  11. **Comments:** Comment your code appropriately, don't include commented out
      code. See the corresponding section in
    [Clean Code Javascript](https://github.com/ryanmcdermott/clean-code-javascript#comments).
  12. Stick to the golden rule of writing maintainable software: *Always code as if the
      guy who ends up maintaining your code will be a violent psychopath who knows where
      you live.* (John Woods on [comp.lang.c++](https://groups.google.com/forum/#!msg/comp.lang.c++/rYCO5yn4lXw/oITtSkZOtoUJ))

It is recommended to use a code checker to check for these
rules. The most commonly used tool is [eslint](https://eslint.org/), a very good alternative is [jshint](https://jshint.com).

### Further reading

 * Google's Javascript coding guidelines:
   [https://google.github.io/styleguide/jsguide.html](https://google.github.io/styleguide/jsguide.html)
 * Clean-Code-Javascript:
   [https://github.com/ryanmcdermott/clean-code-javascript](https://github.com/ryanmcdermott/clean-code-javascript)
