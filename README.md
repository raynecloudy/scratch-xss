All 3.x.x versions of Scratch Desktop currently have a vulnerability that allows arbitrary code execution through the use of an `img` tag with the `onerror` property inside of a costume. This code is completely unsandboxed, meaning it can read your file system, install ransomware, and really just do what malware does. This project makes it a little less clunky to inject code.

I do not support the use of this project for malicious purposes. I created it for the purpose of experimentation.
