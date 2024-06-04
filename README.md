# Certificado de Afiliación AFP Modelo
(Proyecto postulación Entel)

Este proyecto se enfoca en la implementación de pruebas automatizadas para la nueva funcionalidad de AFP Modelo que permite a los usuarios obtener un certificado de afiliación sin iniciar sesión. 
La ejecución de las pruebas están integradas con Qase para una gestión eficiente y organizada de los casos de prueba.



## Authors

- [@CodeMiau](https://github.com/CodeMiau/PostulacionEntel)


## Installation

Antes de comenzar a desarrollar en el IDE es recomendable realizar las siguientes acciones en:
### Playwright:

Ejecutar el comando de instalación 

```bash
npm init playwright@latest
```
Durante la instalación seleccionar las siguientes opciones:
+ Elegir TypeScript
+ Nombre de el archivo de test: Tests
+ Agregar Github Actions workflow: no
+ Instalar los navegadores de Playwright: si


### Qase:
  + Crear un proyecto en Qase
  + Crear casos de pruebas asociados al proyecto en Qase
  + Crear un API token para playwright en Qase

Para comenzar a instalar la última versión de Qase reporter, ejecutar:

```bash
    npm install -D playwright-qase-reporter
```
Luego agregar la configuración que aparece en la documentación oficial en el archivo `playwright.config.ts` 

```bash
const config: PlaywrightTestConfig = {
  // ...  
  reporter: [
    [
      'playwright-qase-reporter',
      {
        testops: {
          api: {
            token: 'api_token',
          },
          project: 'project_code',
        },
      },
    ],
  ],
  // ...  
};
module.exports = config;
```

    
## Running Tests

Para ejecutar los tests, se debe ejecutar el siguiente comando:

```bash
  npm run test
```

Una vez finalizado se puede acceder a Qase para ver el resultado de las pruebas en la opción Test Run