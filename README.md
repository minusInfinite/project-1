# project-1

## Potential User Story

> AS A Music Lover
>
> I WANT to search for lyrics to music I remember
>
> SO THAT I can find what some has been stuck into my head

## Potential Acceptance Criteria

>GIVEN I am using a song search website
>WHEN I open the website
>THEN I am met with a search bar
>WHEN I type in the song lyrics
>THEN I am met with autocomplete options
>WHEN I click the search button
>THEN I am met with the songs that contain these lyrics
>WHEN I

## VS Code Add-in

If you can be sure to have the following add-ins installed

ESLint - https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint

Prettier - Code formatter - https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode

## Others of note that might be useful

IntelliSense for CSS class names in HTML - https://marketplace.visualstudio.com/items?itemName=Zignd.html-css-class-completion

Debugger for Chrome - https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome

Debugger for Firefox - https://marketplace.visualstudio.com/items?itemName=firefox-devtools.vscode-firefox-debug

## Enable VS Code IntelliSense prompts for JQuery and other Modules

Add a .jsconfig to you project and add the following

```JSON
    "typeAcquisition": {
        "include": [
            "jquery",
        ]
    }
```
