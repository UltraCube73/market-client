with import <nixpkgs> {};
stdenv.mkDerivation {
  name = "react-run-shell";
  buildInputs = with pkgs; [
    nodejs
  ];
}