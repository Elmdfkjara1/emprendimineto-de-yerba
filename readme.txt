instalar librerias




1. Conceptos básicos
Repositorio: donde está guardado todo el código del proyecto.
Rama (branch): una versión paralela del código donde podés trabajar sin modificar directamente la rama principal.
main: rama principal y estable del proyecto.
Commit: guarda un cambio en tu rama.
Push: sube tus commits a GitHub.
Pull: trae cambios que están en GitHub.
Merge: junta los cambios de una rama con otra.
Pull Request (PR): propuesta para incorporar tus cambios a otra rama.
2. Clonar el proyecto

La primera vez, cada integrante hace:

git clone URL_DEL_REPOSITORIO
cd nombre-del-proyecto

Por ejemplo:

git clone https://github.com/equipo/proyecto.git
cd proyecto

Después podés comprobar que estás conectado al repositorio:

git remote -v

Debería aparecer algo como:

origin  https://github.com/equipo/proyecto.git (fetch)
origin  https://github.com/equipo/proyecto.git (push)
3. No trabajen directamente en main

Lo recomendable es que cada desarrollador tenga su propia rama.

Por ejemplo:

main
│
├── tomas
├── lucas
├── juan
└── maria

Cada uno trabaja en su rama y después manda sus cambios a main mediante un Pull Request.

4. Crear una rama

Primero asegurate de tener la última versión:

git checkout main
git pull

Después creás tu rama:

git checkout -b nombre-de-tu-rama

Por ejemplo:

git checkout -b tomas

Podés comprobar en qué rama estás:

git branch

La que tenga * es la actual:

  main
* tomas
5. Trabajar normalmente

Modificás los archivos del proyecto.

Después mirás qué cambió:

git status

Por ejemplo:

modified: src/app/app.ts
modified: src/app/app.html

Agregás los cambios:

git add .

Y hacés un commit:

git commit -m "Agrega carrito de compras"
Consejo

Intenten que los commits expliquen qué hicieron:

Agrega login
Corrige validación de usuarios
Crea servicio de productos
Agrega formulario de registro
Corrige error del carrito

En vez de:

cambios
cosas
aaaa
prueba
6. Subir tu rama a GitHub

La primera vez:

git push -u origin tomas

Después, normalmente alcanza con:

git push

Ahora GitHub tendrá:

main
tomas
7. Pull Request

Cuando terminaste tu trabajo:

GitHub → Pull requests → New pull request

Elegís:

base: main
compare: tomas

Eso significa:

"Quiero meter los cambios de tomas dentro de main."

Los demás integrantes pueden revisar el código.

Si está todo bien:

Merge Pull Request

Y los cambios pasan a main.

8. ¿Qué hago antes de empezar a trabajar?

Esta parte es MUY importante.

Supongamos que ayer trabajaste en tomas, pero hoy otra persona modificó main.

Antes de empezar:

git checkout main
git pull
git checkout tomas
git merge main

Esto actualiza tu rama con los últimos cambios de main.

También pueden usar:

git rebase main

pero para un equipo que recién está aprendiendo Git, merge es más sencillo.

9. ¿Qué pasa si aparece un conflicto?

Por ejemplo:

CONFLICT (content): Merge conflict in app.ts

Git básicamente te está diciendo:

"Dos personas modificaron la misma parte del archivo y no sé cuál conservar."

El archivo puede quedar así:

código de main

Tenés que decidir qué código queda, eliminar esas marcas y guardar el archivo.

Después:

git add .
git commit -m "Resuelve conflicto con main"
10. Flujo recomendado para el equipo

La idea general sería:

                 ┌──────────────┐
                 │     main     │
                 └──────┬───────┘
                        │
          ┌─────────────┼─────────────┐
          ↓             ↓             ↓
      ┌───────┐     ┌───────┐     ┌───────┐
      │ Tomas │     │ Rosaa │     │ xxxx  │
      └───┬───┘     └───┬───┘     └───┬───┘
          │             │             │
       commits       commits       commits
          │             │             │
          └─────────────┼─────────────┘
                        ↓
                 Pull Request
                        ↓
                     main
En resumen, cada desarrollador hace:
git checkout main
git pull


git checkout -b mi-rama


# trabajar...


git add .
git commit -m "Describe el cambio"
git push -u origin mi-rama

Después:

Pull Request → revisión → Merge → main

11. Una estructura todavía mejor

Si son varios desarrolladores, pueden usar ramas por funcionalidad en vez de una rama permanente por persona:

main
│
├── feature/login
├── feature/carrito
├── feature/productos
├── feature/registro
└── fix/error-login

Por ejemplo, si vos estás haciendo el carrito:

git checkout main
git pull
git checkout -b feature/carrito

Cuando terminás:

git add .
git commit -m "Agrega funcionalidad del carrito"
git push -u origin feature/carrito

Y hacés el Pull Request hacia main.

Esta forma suele ser más ordenada, especialmente cuando el proyecto empieza a crecer.