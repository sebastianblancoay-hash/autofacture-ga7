# Estándares de codificación de AutoFacture

Estas reglas aplican a los cambios de GA7. La maqueta de GA5 y los módulos de GA6 conservan los nombres que ya usan sus enlaces.

| Elemento | Regla | Aplicación |
| --- | --- | --- |
| Ramas | Usar `tipo/descripcion-corta`, en minúsculas, con guiones y sin espacios ni tildes. | `docs/ga7-evidencias` reúne los cambios de esta etapa. |
| Commits | Escribir `tipo: descripción` en imperativo y registrar un avance que se pueda revisar. | `chore: configura exclusiones y formato del proyecto` distingue el mantenimiento de la recuperación de pruebas. |
| Archivos y carpetas | En archivos nuevos, usar nombres breves en minúsculas separados por guion. Conservar archivos de configuración y convenciones reconocidas. | `ga7/plan-de-trabajo.md` y `README.md`. Los scripts recuperados mantienen sus nombres para que la documentación previa siga sirviendo. |
| Exclusiones | Ignorar archivos de entorno, claves, dependencias, cachés y temporales. | La [lista del repositorio](../.gitignore) conserva visibles las pruebas, muestras, fuentes y documentación que forman parte del proyecto. |
| Documentación | Organizar descripción, autoría, tecnologías, ejecución, estructura y enlaces en el README. | La [portada del repositorio](../README.md) permite reproducir la demostración por HTTP y ubicar las etapas. |
| Formato | Usar espacios, dos posiciones de indentación, UTF-8 y fin de línea LF en texto nuevo o editado. | [EditorConfig](../.editorconfig) declara el formato de edición. Markdown conserva los espacios finales que pueden representar un salto de línea. |

## Convención para cambios nuevos

`feat` identifica una función nueva y `fix` una corrección. Uso `docs` para documentación, `style` para formato, `refactor` para reorganizar código, `test` para pruebas y `chore` para mantenimiento. El título del pull request usa la misma convención. La historia importada mantiene los mensajes y fechas originales.

## Fines de línea en Windows

En el editor, `end_of_line = lf` indica cómo guardar texto nuevo. Con `core.autocrlf=true`, Git normaliza el texto a LF al preparar los cambios y puede usar CRLF al materializar archivos de texto en Windows. Revisé los finales versionados con `git ls-files --eol`; la comprobación se centró en los archivos nuevos y editados de esta etapa.

Referencias consultadas el 21 de noviembre de 2026: [Conventional Commits](https://www.conventionalcommits.org/es/v1.0.0/) y [EditorConfig](https://editorconfig.org/).
