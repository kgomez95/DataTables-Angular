# DataTables-Angular
Sistema customizado de tablas en Angular.
<br />

# 0.- Pasos para hacer funcionar el proyecto
<h2>0.1.- Requisitos previos</h2>
<p>Es necesario tener instalado <b>Node.js</b> y <b>Angular CLI</b>.</p>
<br />

<h2>0.2.- Preparar el proyecto</h2>
<p>Para hacer funcionar este proyecto una vez descargado o clonado tienes que abrir una línea de comandos en la carpeta del proyecto (en mi caso dentro de la carpeta "app") y ejecutar el siguiente comando:</p>
<ul>
    <li><b><i>npm install</i></b></li>
</ul>
<p>* Este comando instalará las dependencias necesarias para ejecutar la aplicación (creará la carpeta "node_modules").</p>
<p>Estas son las urls diponibles para probar en la aplicación:</p>
<ul>
    <li>http://localhost:4200/home</li>
</ul>
<br />

<h2>0.3.- Ejecución el proyecto</h2>
<p>Para ejecutar la aplicación es necesario ejecutar el comando <b><i>ng serve</i></b> en la carpeta del proyecto.</p>
<br />

# 1.- Introducción
<p>Este pequeño proyecto ha consistido en crear un componente global para poder visualizar cualquier tipo de información plasmada en una tabla.</p>
<p>Los datos que se han utilizado han sido datos de pruebas sin realizar llamadas a ningún servicio, pero la idea para un proyecto real es que los datos se consuman llamando a un servicio web para recuperar los datos con la estructura definida en este componente.</p>
<br />

# 2.- Componente datatable
<p>Este componente <i>datatable</i> está dividido principalmente en tres partes:</p>
<ul>
    <li>Los filtros básicos y avanzados.</li>
    <li>Las cabeceras de la tabla.</li>
    <li>Los datos de la tabla.</li>
</ul>
<br />

<h2>2.1.- Cabeceras</h2>
<p>Estos tres puntos anteriores pueden ser construidos por datos obtenidos desde el propio frontend (desde Angular) o por datos obtenidos a partir de un servicio web. Esto significa que nosotros podemos tener una tabla, por ejemplo, con tres cabeceras en el frontend, y en el caso de querer actualizarla tendríamos que tocar el código del frontend y realizar una instalación para actualizarla.</p>
<p>Por otro lado, para evitar lo comentado en el párrafo anterior, también tenemos la opción de tener una tabla, pero que las cabeceras se obtengan desde un servicio web. En este caso, para modificar las cabeceras de la tabla sería cuestión de modificar el backend, y depende de cómo nos lo montemos, no haría falta ni tocar el backend, simplemente se podría configurar por base de datos y el cambio ya quedaría aplicado al instante (insisto, que esto depende de cómo quiera hacerlo cada uno).</p>
<br />

<h2>2.2.- Filtros</h2>
<p>Con los filtros pasa exactamente lo mismo que con las cabeceras: podemos configurarlos tanto desde el frontend como desde el backend.</p>
<p>En la parte de los filtros tenemos los filtros básicos (que es básicamente un input que abarca varios campos) y los filtros avanzados (que son filtros más específicos para un solo campo).</p>
<br />

<h2>2.3.- Tabla de datos</h2>
<p>La tabla de datos está preparada para ordenar por un campo de forma ascendente o descendente, está preparada para paginar los datos y está preparada para visualizarse correctamente en formato móvil sin necesidad de utilizar el scroll horizontal (básicamente, la tabla pasa a tener un formato de pastillas).</p>
<br />
