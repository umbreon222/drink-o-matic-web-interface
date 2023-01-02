# Drink-O-Matic Web Interface

A crude web interface for my Drink-O-Matic API ([umbreon222/drink-o-matic](https://github.com/umbreon222/drink-o-matic)) built with Angular.

## About The Project

<div>
  <img src="preview-images/drinks.png?raw=true" width="500" height="500">
  <img src="preview-images/pumps.png?raw=true" width="500" height="500">
</div>

I was watching some YouTube videos about cool things to do with embedded systems when I came across something called a "barbot". It was an arduino powered cocktail bar which inspired me to try and make something similiar at a cost that wouldn't break the bank. Thus the "Drink-O-Matic" was born. This project is a bare minimum UI which wraps the API I came up with. If you're interested, you can read more over on [my APIs README](https://github.com/umbreon222/drink-o-matic/#readme)

## Getting Started

### Usage

1. Update the environment files in _src\environments_ to point to your instance of the Drink-O-Matic API.
2. Start your [Drink-O-Matic API](https://github.com/umbreon222/drink-o-matic/#usage) with the "bff" (back-end for front-end) feature enabled

`cargo run -r --features bff`

3. Start a dev server

`ng serve`

4. Navigate to `http://localhost:4200/`
5. Add & configure your ingredients
<img src="preview-images/ingredients-step.png?raw=true">
6. Assign your ingredients to the appropriate pumps
<img src="preview-images/pumps-step.png?raw=true">
7. Create a cup (this helps with calculating how much of each ingredient to pump)
<img src="preview-images/cups-step.png?raw=true">
8. Create your drink
<img src="preview-images/drinks-step.png?raw=true">
9. Make it!<img src="preview-images/make-it-step.png?raw=true">

Note: If you want this to be accessible to all devices on the network you can set the start command in _package.json_ to `ng serve --host=0.0.0.0`

## License

Distributed under the MIT License. See [LICENSE.txt](/LICENSE.txt) for more information. ([back to top](/#drink-o-matic-web-interface))
