import { test, expect } from '@playwright/test';
import { qase } from 'playwright-qase-reporter';

test('Pagina - Descargar Certificados de afiliacion en línea', async ({ page }) => {
  //ID de caso de prueba en QASE
    qase.id(7);

  // Step #1: Ingresar al sitio web de AFP modelo
    await page.goto('https://www.afpmodelo.cl');
    await page.waitForTimeout(1000);

    await page.screenshot({path: 'tests/screenshots/CAM-1_Paso1.png'});
  // Expected result: Se carga correctamente la pagina de inicio de AFP Modelo

  // Step #2: Seleccionar la opcion Tramites y herramientas del menu de Afiliados
    await expect(page.getByText('Trámites y herramientas')).toBeVisible();
    await page.getByRole('menuitem', { name: 'Trámites y herramientas icon' }).locator('svg').click();
    await page.waitForTimeout(2000);
    const page1Promise = page.waitForEvent('popup');
   
    await page.screenshot({path: 'tests/screenshots/CAM-1_Paso2.png'});
  // Expected result: Se abre menu desplegable para la opcion Tramites y herramientas con la opción Descarga tus Certificados

  // Step #3: Seleccionar la opcion Descarga tus certificados
    await page.waitForTimeout(2000);
    await page.getByRole('link', { name: 'Descarga tus certificados', exact: true }).focus();
    await page.screenshot({path: 'tests/screenshots/CAM-1_Paso3.png'});

    await page.getByRole('link', { name: 'Descarga tus certificados', exact: true }).click();
    const page1 = await page1Promise;
  // Expected result: La opcion se encuenta visible y habilitada

  // Step #4: Seleccionar la opción Certificado de afiliación
    await expect(page1.getByText('Certificado de afiliación')).toBeVisible();
    await page1.waitForTimeout(1000);
    await page1.screenshot({path: 'tests/screenshots/CAM-1_Paso4.png'});
   
    await page1.getByRole('link', { name: 'icon: right' }).first().click();
    await page1.waitForTimeout(2000);
    await page1.screenshot({path: 'tests/screenshots/CAM-1_Paso4-1.png'});
  // Expected result: La opción está habilitada y se carga correctamente la pagina: Certificado de afiliación en línea

});

test('Descargar certificados afiliacion - Rut valido', async ({ page }) => {
  //ID de caso de prueba en QASE
    qase.id(8);

    test.setTimeout(150_000);
  // Step #1: Ingresar a la pagina de Certificado de afiliación
    await page.goto('https://nueva.afpmodelo.cl/afiliados');
    await page.getByRole('menuitem', { name: 'Trámites y herramientas icon' }).locator('svg').click();
    await page.waitForTimeout(2000);
    const page1Promise = page.waitForEvent('popup');
    await page.getByRole('link', { name: 'Descarga tus certificados', exact: true }).click();
    const page1 = await page1Promise;
    await page.waitForTimeout(2000);
    await page1.getByRole('link', { name: 'icon: right' }).first().click();
    await page1.waitForTimeout(1000);

    await page1.screenshot({path: 'tests/screenshots/CAM-2_Paso1.png'});
  // Expected result: Se carga pagina Certificado de afiliación en línea

  // Step #2: Ingresar dato en campo de texto Ingrese su rut
    await page1.waitForTimeout(2000);  
    await page1.getByPlaceholder('-9').click();
    await page1.getByPlaceholder('-9').fill('17454441-7');
    await page1.waitForTimeout(2000);  
    
    await page1.screenshot({path: 'tests/screenshots/CAM-2_Paso2.png'});
    await page1.getByRole('button', { name: 'Obtener Certificado' }).isEnabled();
  // Expected result: Se habilita el boton Obtener Certificado

  // Step #3: Presionar el boton Obtener Certificado
    await page1.getByRole('button', { name: 'Obtener Certificado' }).click();
    await page1.waitForTimeout(1000); 
    await expect(page1.getByText('Buscando certificado...')).toBeVisible();
    await page1.screenshot({path: 'tests/screenshots/CAM-2_Paso3.png'});
    
    await page1.waitForTimeout(9000);  
  // Expected result: Se despliega mensaje Buscando certificados

  // Step #4: Esperar que termine de buscar
    await page1.waitForTimeout(9000);
    await expect(page1.getByRole('link', { name: 'Descargar Certificado' })).toBeVisible();
    await page1.screenshot({path: 'tests/screenshots/CAM-2_Paso4.png'});
    await page1.waitForTimeout(1000);  
    const page2Promise = page1.waitForEvent('popup');
  // Expected result: Muestra mensaje de exito y se habilita el boton Descargar Certificado

  // Step #5: Presionar el boton Descargar certificado
    await page1.waitForTimeout(1000);
    await page1.getByRole('link', { name: 'Descargar Certificado' }).click();
    const page2 = await page2Promise;
    await page2.waitForTimeout(2000);  
    await page2.screenshot({path: 'tests/screenshots/CAM-2_Paso5.png'});
    await page2.waitForTimeout(2000); 
  // Expected result: Se descarga correctamente el certificado

});

test('Descargar certificados afiliacion - Rut no valido', async ({ page }) => {
    //ID de caso de prueba en QASE
    qase.id(9);

  // Step #1: Ingresar a la pagina de afiliacion en linea
    await page.goto('https://nueva.afpmodelo.cl/afiliados');
    await page.getByRole('menuitem', { name: 'Trámites y herramientas icon' }).locator('svg').click();
    await page.waitForTimeout(2000);
    const page1Promise = page.waitForEvent('popup');
    await page.getByRole('link', { name: 'Descarga tus certificados', exact: true }).click();
    const page1 = await page1Promise;
    await page1.waitForTimeout(2000);
    await page1.getByRole('link', { name: 'icon: right' }).first().click();
    await page1.waitForTimeout(1000);
    
    await page1.screenshot({path: 'tests/screenshots/CAM-3_Paso1.png'});
  // Expected result: Se carga pagina Certificado de afiliación en línea

  // Step #2: Ingresar dato en campo de texto Ingrese su rut
    await page1.getByPlaceholder('-9').click();
    await page1.getByPlaceholder('-9').fill('16454441-7');
    await page1.getByPlaceholder('-9').press('Enter');
    await page1.waitForTimeout(2000);

    await page1.screenshot({path: 'tests/screenshots/CAM-3_Paso2.png'});
  // Expected result: No se habilita el boton Obtener Certificado

  // Step #3: Presionar el boton Obtener Certificado
    await page1.getByRole('button', { name: 'Obtener Certificado' }).isDisabled();
    await page1.waitForTimeout(1000);

    await page1.screenshot({path: 'tests/screenshots/CAM-3_Paso3.png'});
    await page1.waitForTimeout(1000);
  // Expected result: No se realiza ninguna accion

});


test('Descargar certificados afiliacion- Rut no cliente', async ({ page }) => {
  //ID de caso de prueba en QASE
  qase.id(10);

  // Step #1: Ingresar a la pagina de afiliacion en linea
    await page.goto('https://nueva.afpmodelo.cl/afiliados');
    await page.getByRole('menuitem', { name: 'Trámites y herramientas icon' }).locator('svg').click();
    await page.waitForTimeout(2000);
    const page1Promise = page.waitForEvent('popup');
    await page.getByRole('link', { name: 'Descarga tus certificados', exact: true }).click();
    const page1 = await page1Promise;
    await page1.waitForTimeout(2000);
    await page1.getByRole('link', { name: 'icon: right' }).first().click();
    await page1.waitForTimeout(1000);

    await page1.screenshot({path: 'tests/screenshots/CAM-4_Paso1.png'});
  // Expected result: Se carga pagina Certificado de afiliación en línea

  // Step #2: Ingresar dato en campo de texto Ingrese su rut
    await page1.getByPlaceholder('-9').fill('99999999-9');
    await page1.waitForTimeout(2000);
    await page1.screenshot({path: 'tests/screenshots/CAM-4_Paso2.png'});
  // Expected result: Se habilita el boton Obtener Certificado

  // Step #3: Presionar el boton Obtener Certificado
    await page1.getByRole('button', { name: 'Obtener Certificado' }).click();
    await expect(page1.getByText('Buscando certificado...')).toBeVisible();
    await page1.screenshot({path: 'tests/screenshots/CAM-4_Paso3.png'});
    await page1.waitForTimeout(3000);
    await expect(page1.getByText('No eres afiliado o hay un')).toBeVisible();
    await page1.screenshot({path: 'tests/screenshots/CAM-4_Paso3-2.png'});
    await page1.waitForTimeout(1000);
  // Expected result: Se despliega mensaje de error: No eres afiliado o hay un error en el RUT ingresado. Intente nuevamente y no se habilita el boton Descargar certificado

});


test('Descargar certificados afiliacion - Caracteres especiales', async ({ page }) => {
    //ID de caso de prueba en QASE
    qase.id(11);

    // Step #1: Ingresar a la pagina de afiliacion en linea
    await page.goto('https://nueva.afpmodelo.cl/afiliados');
    await page.getByRole('menuitem', { name: 'Trámites y herramientas icon' }).locator('svg').click();
    await page.waitForTimeout(2000);
    const page1Promise = page.waitForEvent('popup');
    await page.getByRole('link', { name: 'Descarga tus certificados', exact: true }).click();
    const page1 = await page1Promise;
    await page1.waitForTimeout(2000);
    await page1.getByRole('link', { name: 'icon: right' }).first().click();
    await page1.waitForTimeout(1000);

    await page1.screenshot({path: 'tests/screenshots/CAM-5_Paso1.png'});
    await page1.waitForTimeout(1000);
  // Expected result: Se carga pagina Certificado de afiliación en línea

  // Step #2: Ingresar dato en campo de texto Ingrese su rut
    await page1.getByPlaceholder('-9').click();
    await page1.getByPlaceholder('-9').fill('=');
    await page1.getByPlaceholder('-9').press('#');
    await page1.getByPlaceholder('-9').fill('$'); 
    await page1.getByPlaceholder('-9').fill('%&/(');
    await page1.getByPlaceholder('-9').press('Enter');

    await page1.screenshot({path: 'tests/screenshots/CAM-5_Paso2.png'});
    await page1.waitForTimeout(1000);
  // Expected result: No se habilita el boton Obtener Certificado

  // Step #3: Presionar el boton Obtener Certificado
    await page1.getByRole('button', { name: 'Obtener Certificado' }).isDisabled();

    await page1.screenshot({path: 'tests/screenshots/CAM-5_Paso3.png'});
    await page1.waitForTimeout(1000);
  // Expected result: No se realiza ninguna accion

});

test('Descargar certificados afiliacion - Campos vacios', async ({ page }) => {
  //ID de caso de prueba en QASE
  qase.id(12);

  // Step #1: Ingresar a la pagina de afiliacion en linea
    await page.goto('https://nueva.afpmodelo.cl/afiliados');
    await page.getByRole('menuitem', { name: 'Trámites y herramientas icon' }).locator('svg').click();
    await page.waitForTimeout(2000);
    const page1Promise = page.waitForEvent('popup');
    await page.getByRole('link', { name: 'Descarga tus certificados', exact: true }).click();
    const page1 = await page1Promise;
    await page1.waitForTimeout(2000);
    await page1.getByRole('link', { name: 'icon: right' }).first().click();
    await page1.waitForTimeout(1000);

    await page1.screenshot({path: 'tests/screenshots/CAM-6_Paso1.png'});
    await page1.waitForTimeout(1000);
  // Expected result: Se carga pagina Certificado de afiliación en línea

  // Step #2: Ingresar dato en campo de texto Ingrese su rut
    await page1.getByPlaceholder('-9').click();
    await page1.getByPlaceholder('-9').press('Enter');

    await page1.screenshot({path: 'tests/screenshots/CAM-6_Paso2.png'});
    await page1.waitForTimeout(1000);
  // Expected result: No se habilita el boton Obtener Certificado

  // Step #3: Presionar el boton Obtener Certificado
    await page1.getByRole('button', { name: 'Obtener Certificado' }).isDisabled();

    await page1.screenshot({path: 'tests/screenshots/CAM-6_Paso3.png'});
    await page1.waitForTimeout(1000);
  // Expected result: No se realiza ninguna accion

});

test('Certificados Afiliación copyright', async ({ page }) => {
  //ID de caso de prueba en QASE
    qase.id(52);

  // Step #1: Ingresar a la pagina de afiliacion en linea
    await page.goto('https://nueva.afpmodelo.cl/afiliados');
    await page.getByRole('menuitem', { name: 'Trámites y herramientas icon' }).locator('svg').click();
    await page.waitForTimeout(2000);
    const page1Promise = page.waitForEvent('popup');
    await page.getByRole('link', { name: 'Descarga tus certificados', exact: true }).click();
    const page1 = await page1Promise;
    await page.waitForTimeout(2000);
    await page1.getByRole('link', { name: 'icon: right' }).first().click();
    await page1.waitForTimeout(1000);

    await page1.screenshot({path: 'tests/screenshots/CAM-7_Paso1.png'});
  // Expected result: Se carga pagina Certificado de afiliación en línea

  // Step #2: Buscar fecha de copyright del sitio web
    await page1.evaluate(() =>{ 
      window.scrollBy(0,1000);
    });
    await expect(page1.getByText('© 2024 AFP Modelo. Todos los')).toBeVisible();
    await page1.waitForTimeout(1000);
    await page1.screenshot({path: 'tests/screenshots/CAM-7_Paso2.png'});
   
    await page1.waitForTimeout(1000);
    // Expected result: © 2024 AFP Modelo. Todos los Derechos Reservados.

});