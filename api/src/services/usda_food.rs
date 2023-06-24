use reqwest::Error;
use serde::Deserialize;

use crate::dto::food_dtos::FoodDto;

static USDA_DOMAIN: &str = "https://api.nal.usda.gov/fdc/v1";
static USDA_API_KEY: &str = "g8hkV8fS6A17dTaS0DEk464LisJCu8AdN2gKIU2C";

enum Routes {
    Search,
    FoodDto,
    Foods,
}

impl Routes {
    fn to_string(&self) -> String {
        match self {
            Routes::Search => format!("{}/foods/search", USDA_DOMAIN),
            Routes::FoodDto => format!("{}/food", USDA_DOMAIN),
            Routes::Foods => format!("{}/foods", USDA_DOMAIN),
        }
    }
}
#[derive(Debug, Deserialize, Clone)]
#[serde(rename_all = "camelCase")]
pub struct USDANutrientDto {
    pub id: Option<i32>,
    pub number: Option<String>,
    pub name: Option<String>,
    pub unit_name: Option<String>,
}

#[derive(Debug, Deserialize, Clone)]
#[serde(rename_all = "camelCase")]
pub struct USDAFoodNutrientDto {
    pub id: Option<i32>,
    pub amount: Option<f32>,
    pub nutrient: USDANutrientDto,
}

#[derive(Debug, Deserialize, Clone)]
#[serde(rename_all = "camelCase")]
pub struct USDABranndedFoodItemDto {
    pub fdc_id: i32,
    pub description: String,
    pub data_type: String,
    pub brand_name: Option<String>,
    pub brand_owner: Option<String>,
    pub household_serving_full_text: Option<String>,
    pub ingredients: Option<String>,
    pub serving_size: Option<f32>,
    pub serving_size_unit: Option<String>,
    pub branded_food_category: Option<String>,
    pub food_nutrients: Vec<USDAFoodNutrientDto>,
}

pub async fn get_usda_food_by_search(search: &str, page: i32) -> Result<(), Error> {
    let client = reqwest::Client::new();
    let res = client
        .get(&Routes::Search.to_string())
        .query(&[
            ("api_key", USDA_API_KEY),
            ("generalSearchInput", search),
            ("dataType", "Branded"),
            ("pageNumber", &page.to_string()),
            ("pageSize", "10"),
        ])
        .send()
        .await?;

    let body = res.text().await?;
    println!("body = {:?}", body);

    return Ok(());
}

pub async fn get_usda_food_by_id(id: &str) -> Result<FoodDto, Error> {
    let client = reqwest::Client::new();
    let res = client
        .get(&format!("{}/{}", Routes::FoodDto.to_string(), id))
        .query(&[("api_key", USDA_API_KEY)])
        .send()
        .await?
        .json::<USDABranndedFoodItemDto>()
        .await?;

    let res = FoodDto::from(res);

    return Ok(res);
}

pub async fn get_usda_foods_by_ids(ids: Vec<i32>) -> Result<Vec<FoodDto>, Error> {
    let ids = &ids
        .iter()
        .map(|id| id.to_string())
        .collect::<Vec<String>>()
        .join(",");

    let client = reqwest::Client::new();
    let res = client
        .get(&Routes::Foods.to_string())
        .query(&[("api_key", USDA_API_KEY), ("fdcIds", ids)])
        .send()
        .await?
        .json::<Vec<USDABranndedFoodItemDto>>()
        .await?;

    let res = res
        .iter()
        .map(|food| FoodDto::from(food.to_owned()))
        .collect::<Vec<_>>();

    return Ok(res);
}
