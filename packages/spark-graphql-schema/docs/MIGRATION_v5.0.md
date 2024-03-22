# Migration to v5.0.0

## channel argument is now mandatory

The `channel` argument is now mandatory in all queries / mutations that take it.

Please add the argument to every query that requires it, with one of the values `personalshop | personalss | businessshop`.
