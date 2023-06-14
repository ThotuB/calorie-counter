use reqwest::Error;
use serde::Deserialize;

use crate::{dto::food::Food, utils::food_conversion::usda_food_to_food};

static USDA_DOMAIN: &str = "https://api.nal.usda.gov/fdc/v1";
static USDA_API_KEY: &str = "g8hkV8fS6A17dTaS0DEk464LisJCu8AdN2gKIU2C";

enum Routes {
    Search,
    Food,
    Foods,
}

impl Routes {
    fn to_string(&self) -> String {
        match self {
            Routes::Search => format!("{}/foods/search", USDA_DOMAIN),
            Routes::Food => format!("{}/food", USDA_DOMAIN),
            Routes::Foods => format!("{}/foods", USDA_DOMAIN),
        }
    }
}
#[derive(Debug, Deserialize, Clone)]
pub struct USDANutrientDto {
    pub id: Option<i32>,
    pub number: Option<String>,
    pub name: Option<String>,
    pub unitName: Option<String>,
}

#[derive(Debug, Deserialize, Clone)]
pub struct USDAFoodNutrientDto {
    pub id: Option<i32>,
    pub amount: Option<f32>,
    pub nutrient: USDANutrientDto,
}

#[derive(Debug, Deserialize, Clone)]
pub struct USDABranndedFoodItemDto {
    pub fdcId: i32,
    pub description: String,
    pub dataType: String,
    pub brandName: Option<String>,
    pub brandOwner: Option<String>,
    pub householdServingFullText: Option<String>,
    pub ingredients: Option<String>,
    pub servingSize: Option<f32>,
    pub servingSizeUnit: Option<String>,
    pub brandedFoodCategory: Option<String>,
    pub foodNutrients: Vec<USDAFoodNutrientDto>,
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

pub async fn get_usda_food_by_id(id: &str) -> Result<Food, Error> {
    let client = reqwest::Client::new();
    let res = client
        .get(&format!("{}/{}", Routes::Food.to_string(), id))
        .query(&[("api_key", USDA_API_KEY)])
        .send()
        .await?
        .json::<USDABranndedFoodItemDto>()
        .await?;

    let res = usda_food_to_food(res);

    return Ok(res);
}

pub async fn get_usda_foods_by_ids(ids: Vec<i32>) -> Result<Vec<Food>, Error> {
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
        .map(|food| usda_food_to_food(food.to_owned()))
        .collect::<Vec<_>>();

    return Ok(res);
}
