import moduleAlias from "module-alias";

moduleAlias.addAliases({
  "@src": __dirname + "/src",
  "@controllers": __dirname + "/src/controllers",
  "@models": __dirname + "/src/models",
  "@routes": __dirname + "/src/routes",
  "@config": __dirname + "/src/config",
  "@utils": __dirname + "/src/utils",
  "@auth": __dirname + "/src/auth",
});
