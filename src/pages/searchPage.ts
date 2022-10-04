import basicPage from "./basicPage";

class searchPage extends basicPage {

    url = "https://yandex.ru/video/";

    private locatorButtonInputClear = page.locator(".input__clear");
    private locatorInputSearch = page.locator(".input__control");
    private locatorButtonSearch = page.locator('[type=submit]').first();
    private locatorVideoListItem = page.locator(".serp-item__preview");
    private locatorVideoHovered = page.locator(".serp-item__preview", {has: page.locator(".thumb-image_hovered")});
    private locatorVideoPreview = page.locator(".serp-item__preview", { has: page.locator(".thumb-preview__target_playing") });

    /**
     * Открывает страницу с заданным url
     */
    async openPage() {
        await page.goto(this.url);
        console.log(`Открыта страница с адресом ${this.url}`);
     }

    /**
     * Нажимает кнопку "х" для очистки поля поиска
     */
    async clearInputField() {
        await this.locatorButtonInputClear.click();
        console.log(`Клик на кнопке "x" в поле поиска`);
    }

    /**
     * Вводит текст в поле поиска
     * @param request - текст запроса
     */
    async fillInputField(request: string) {
        await this.locatorInputSearch.fill(request);
        console.log(`Ввод текста "${request}" в поле поиска`);
    }

    /**
     * Нажимает кнопку "Найти" и ждет выполнения запроса
     */
    async clickButtonSearch() {
        await Promise.all([
        page.waitForResponse(response => response.url().includes(`${this.url}search?format=json`) && response.status() === 200),    
        this.locatorButtonSearch.click(),             
      ])
      console.log(`Клик на кнопке "Найти"`); 
    }

    /**
     * Проверяет, что отображается блок с результатами поиска
     */
    async assertVisibleSearchResults() {        
      expect ((await page.waitForSelector(".content__left")).isVisible);
      console.log(`Результаты поиска отображаются`);
    }

    /**
     * Наводит курсор на видео с заданным номером в списке
     * @param videoNumber - номер видео в списке
     */
    async hoverOnVideo(videoNumber: number) {
       await this.locatorVideoListItem.nth(videoNumber).hover();
       console.log(`Курсор установлен на видео с номером ${videoNumber} в списке`);
    }

    /**
     * Проверяет, что курсор наведен
     */
    assertVideoIsHovered() {
        expect (this.locatorVideoHovered.isVisible());
    }

    /**
     * Проверяет, что отображается превью
     */
    assertVisiblePreview() {
        this.locatorVideoPreview.isVisible();
        console.log(`Превью видео отображается`);
    }
}

export default searchPage;