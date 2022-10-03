abstract class basicPage {

   /**
   Открывает страницу с указанным url
   url: string - адрес сайта */
   async openPageByUrl(url: string) {
      await page.goto(url);
      console.log(`Открыта страница с адресом ${url}`);
   }
    
   /**
   Проверяет, что в заголовке страницы содержится указанный текст
   title: string - проверяемый текст   */
   async assertPageTitle(title: string) {
      expect ((await page.title()).includes(title));
      console.log(`В заголовке страницы содержится текст "${title}"`);
   }
}

export default basicPage;