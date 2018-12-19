# dist-force
Publish your lib forder to a branch instead of npm to reference github in your `package.json`

## How ?
```sh
npx dist-force
```
This command will run `prepublishOnly || prepublish || prepare` and create a branch called `npm` and a tag with the current `package.json` version field so you can use your module builded like:
```sh
npm i -D git+ssh://git@github.com:<user>/<repo>.git#npm
```

## Options

### -b, --branch
Will publish to the `latest` branch
```
npx dist-force -b latest
```

### -o, --origin
Will publish to the `upstream` origin
```
npx dist-force -o upstream
```


## Future options

### -P, --no-push
Prevent publishing the branch
```
npx dist-force -P
```

### -d, --dotfiles
Include dotfiles
```
npx dist-force -d
``` 

## Troubleshooting
```
ProcessError: fatal: A branch named 'npm' already exists.
```
To fix this run `rm -fr node_modules/gh-pages/.cache`
[read more](https://www.npmjs.com/package/gh-pages#when-get-error-branch-already-exists)
