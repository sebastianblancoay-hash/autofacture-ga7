# Procedimiento de Git en Windows

Git para Windows estaba instalado al iniciar la práctica. Usé PowerShell y verifiqué la versión con `git --version`. Los registros y las capturas del informe integrador corresponden a las ejecuciones en Windows.

## Configuración global

```powershell
git config --global user.name 'Sebastián Alejandro Blanco Ytriago'
git config --global user.email sebastianblancoay@gmail.com
git config --global init.defaultBranch main
git config --global core.autocrlf true
git config --global --get-regexp '^(user\.(name|email)|init\.defaultbranch|core\.autocrlf)$'
```

Consulté solo los cuatro valores de la práctica. Git Credential Manager mantiene la sesión de GitHub para los comandos HTTPS. El correo configura la autoría del commit y la sesión habilita el envío. Son verificaciones diferentes.

## Clonación y primer envío

```powershell
git clone --branch main --origin origin https://github.com/sebastianblancoay-hash/autofacture-ga5.git autofacture-ga7
Set-Location autofacture-ga7
git remote set-url origin https://github.com/sebastianblancoay-hash/autofacture-ga7.git
git remote -v
git rev-list --count HEAD
git push -u origin main
```

El clon recibió los quince commits históricos hasta `2cbba33`. Antes de enviar cambié y comprobé el destino de `origin`. El primer envío publicó esa línea base en el repositorio vacío de GA7. La publicación de GA6 conserva su repositorio y su dirección.

## Trabajo en la rama de GA7

```powershell
git switch -c docs/ga7-evidencias
git status --short --branch
git add .gitignore .editorconfig
git diff --cached --check
git commit -m 'chore: configura exclusiones y formato del proyecto'
git push -u origin docs/ga7-evidencias
```

Preparé cada grupo de archivos antes de confirmarlo. El primer envío de la rama GA7 abrió el flujo de revisión hacia `main`. El historial de los trabajos anteriores quedó como base de la versión. El PR registra archivos, diferencias y pruebas.

## Verificación de la versión

Después de integrar el PR, el procedimiento de cierre actualiza `main` con `git pull --ff-only origin main`. La etiqueta `v1.0.0` se crea como anotada y se contrasta con el commit fusionado antes de publicar las notas de la release.

```powershell
git cat-file -t v1.0.0
git rev-parse 'v1.0.0^{}'
git log -1 --oneline
```

Las consultas comprueban el tipo del objeto, el commit señalado por la etiqueta y la revisión de `main`. El [repositorio público](https://github.com/sebastianblancoay-hash/autofacture-ga7) y la sección [Releases](https://github.com/sebastianblancoay-hash/autofacture-ga7/releases) permiten contrastar esos datos.
