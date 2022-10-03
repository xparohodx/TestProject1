import searchPage from "../pages/searchPage";

afterEach(async () => {
  let date = new Date();
  await page.screenshot({ path: `./screenshots/${test.name}_${browserName}_${date.getTime()}.png` });
})

test('Yandex video search', async () => {
  
  //поисковый запрос
  const searchQuery = "ураган";
  //номер видео в списке, для которого проверяем превью
  const videoNumber = 6;

  const newSearchPage = new searchPage();
  
  //шаг 1
  await newSearchPage.openPageByUrl("https://yandex.ru/video/");
  await newSearchPage.assertPageTitle("видео найдено в Яндексе");   
        
  //шаг 2    
  newSearchPage.clearInputField();
  newSearchPage.fillInputField(searchQuery);
  
  //шаг 3
  newSearchPage.clickButtonSearch();
  newSearchPage.assertVisibleSearchResults();

  //шаг 4
  await newSearchPage.hoverOnVideo(videoNumber);
  newSearchPage.assertVideoIsHovered();

  //шаг 5
  newSearchPage.assertVisiblePreview();    
  });