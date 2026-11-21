# Herramientas de versionamiento y alojamiento

Git registra la historia del proyecto en el equipo. GitHub aloja el repositorio remoto y ofrece revisión, seguimiento de tareas y publicación. El control de versiones y el alojamiento se comparan por separado porque cumplen funciones distintas.

## Control de versiones

| Herramienta | Modelo | Ramas y trabajo local | Encaje con AutoFacture |
| --- | --- | --- | --- |
| Git | Distribuido | El clon conserva los commits. Permite preparar archivos en staging, crear ramas y confirmar en local. | Conserva la historia previa y permite subir la misma línea base al repositorio de GA7. |
| Mercurial | Distribuido | Tiene historial y commits locales, con ramas y marcadores. | Puede trabajar sin red, pero incorporar otro sistema implicaría convertir o mantener dos historiales de trabajo. |
| Apache Subversion | Centralizado | La copia local sirve para editar. Los commits se registran en el repositorio central y una rama se organiza como una ruta. | El historial compartido depende del servidor. Se descartó porque la práctica requiere clonar y versionar localmente el historial Git existente. |

## Alojamiento

| Servicio | Revisión de cambios | Rastro de una entrega | Criterio para este proyecto |
| --- | --- | --- | --- |
| GitHub | Pull requests con diferencias y conversación. | Issues, tags, Releases y publicación estática con Pages. | El proyecto ya tenía su historial y autoría en GitHub. La publicación y la revisión se pueden comprobar en el mismo repositorio. |
| GitLab | Merge requests con discusión y diferencias. | Repositorios Git, seguimiento de tareas y gestión de versiones. | Sería útil con un flujo centrado en GitLab. Para esta etapa exigiría trasladar la ubicación de revisión y crear nuevos enlaces sin aportar una necesidad del proyecto. |
| Bitbucket Cloud | Pull requests que comparan ramas y reúnen comentarios. | Repositorio Git con ramas y etiquetas. | Resulta útil si el equipo trabaja en el entorno Atlassian. AutoFacture ya tiene el flujo y la publicación en GitHub. |

Se eligió Git porque el clon conserva los commits y su autoría y permite trabajar con ramas locales. GitHub reúne las diferencias y su revisión en el PR. Una etiqueta anotada identifica el commit evaluado y GitHub Pages publica la demostración desde el mismo proyecto.

## Conceptos aplicados a la práctica

| Concepto | Aplicación |
| --- | --- |
| Repositorio | Carpeta versionada que conserva archivos, configuraciones de Git e historial en el clon. |
| Commit | Registro de una revisión de los archivos preparados, con fecha, autor y mensaje. |
| Rama | Referencia que avanza con los commits. `docs/ga7-evidencias` identifica la revisión de esta etapa. |
| Staging | Selección de archivos preparada con `git add`. `git diff --cached` permite revisar lo que entrará al siguiente commit. |
| Remoto | Dirección de publicación. `origin` identifica el repositorio GitHub de GA7 en la copia local. |
| Clone | Copia de la línea base y del historial anterior desde el repositorio de GA5/GA6. |
| Push | Envío de commits y referencias. Primero se publicó la base en `main` y después la rama de GA7. |
| Pull | Trae una rama y la integra en la copia local. En el flujo de GA7 se usa `--ff-only` para actualizar `main` después del merge. |
| Merge | Integración de las revisiones de la rama de trabajo en `main`, conservando los commits de la rama. |
| Pull request | Solicitud de integrar la rama, con sus diferencias y el registro de la revisión técnica. |
| Issue | Tarea identificable que se relaciona con los cambios y su criterio de cierre. |
| Release | Publicación con notas asociadas a la etiqueta del commit evaluado. |

## Fuentes oficiales

Consultadas el 21 de noviembre de 2026.

- [Git y modelos de control de versiones](https://git-scm.com/book/en/v2/Getting-Started-About-Version-Control)
- [Mercurial SCM](https://www.mercurial-scm.org/)
- [Apache Subversion](https://subversion.apache.org/)
- [Pull requests de GitHub](https://docs.github.com/en/pull-requests/reference/pull-requests)
- [Merge requests de GitLab](https://docs.gitlab.com/user/project/merge_requests/)
- [Pull requests de Bitbucket Cloud](https://support.atlassian.com/bitbucket-cloud/docs/create-a-pull-request/)
