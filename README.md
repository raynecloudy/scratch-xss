All 3.x.x versions of Scratch Desktop currently have a vulnerability that allows arbitrary code execution through the use of an `img` tag with the `onerror` property inside of a costume. This code is completely unsandboxed, meaning it can read your file system, install ransomware, and really just do what malware does. This is really dangerous, but also really cool to me! So I wrote a script that makes it less annoying to write and inject code.

I do not support the use of this project for malicious purposes. I created it for the purpose of experimentation.

## Directions
Run the following command.

```sh
npm run setup
```

This will compile the build script. Next, create a file in `src` called `xss.js`. This is where you write the injected JavaScript code. Please remember that the file must be CommonJS, and you cannot import locally.

When you are finished, run this script to build the Scratch project.

```sh
npm run build
```

The output file can be found in `dist/project.sb3`.
