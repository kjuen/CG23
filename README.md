# Intro Computer Graphics WS 2023/24

Course material for lecture 'Introduction to Computer Graphics'. The platform is WebGL,
Javascript and [three.js](https://threejs.org), all of which should run on any reasonably
recent web browser.

1. [Contents of the course](#1-contents-of-the-course)
2. [Software used in the course](#2-software-used-in-the-course)
3. [Basic git usage on the command line](#3-basic-git-usage-on-the-command-line)



## 1 Contents of the course

  * Chapter 1: Introduction
  * Chapter 2: Review of vectors and matrices
  * Chapter 3: Introduction to Javascript
  * Chapter 4: Getting started with WebGL and *three.js*
  * Chapter 5: Defining geometries
  * Chapter 6: Moving things around
  * Chapter 7: Linear maps and transformation matrices
  * Chapter 8: Affine maps and homogeneous coordinates
  * Chapter 9: Camera models and the view pipeline
  * Chapter 10: Light and material
  * Chapter 11: Shading and the fragment pipeline
  * Chapter 12: Textures


## 2 Software used in the course

### Absolutely required
* A modern webbrowser, e.g. Firefox
* An editor to edit Html- and Javascript-files
  * Very popular: VS Code [https://code.visualstudio.com](https://code.visualstudio.com)
  * Freely-licensed version: VSCodium [https://vscodium.com](https://vscodium.com)

### Optional but recommended software
* A git client
  * a Windows version: [https://gitforwindows.org](https://gitforwindows.org)
  * well integrated into most editors

* Node.js: [https://nodejs.org](https://nodejs.org)
  * ESLint - a Node-based, very good code checker: [https://eslint.org](https://eslint.org)

* A Web server, either Node.js or Python or something else
  * see section on local servers in [https://threejs.org/docs/index.html#manual/en/introduction/Installation](https://threejs.org/docs/index.html#manual/en/introduction/Installation)

## 3 Basic git usage on the command line
This explains some very basic steps to get the code and synchronize with this repository.

![git.png](https://imgs.xkcd.com/comics/git.png "Git wisdom")

(Cartoon from [http://www.walkingrandomly.com/?p=6653](http://www.walkingrandomly.com/?p=6653))

### Cloning the repository
This is the initial step which downloads all files from the repository into a new directory. To clone the repository type

```
git clone https://github.com/kjuen/CG23.git
```

on the command line.

### Status of the repository
The command

```
git status
```

shows which files you have added or modified compared with the original state of the repository.

### Synchronising your local version with the repository
The command

```
git pull
```

downloads the current version of the repository but does not overwrite the files that
you've changed. To find out the difference between your local copy of a file `myfile.js` and the version in the repository, execute the command

```
git diff myfile.js
```

The local version of the file can be discarded with

```
git restore myfile.js
```

### Some references

* GitHowTo: [https://githowto.com](https://githowto.com)
