use serde::Deserialize;
use surf::Error;

use crate::dto::food_dtos::FoodDto;

static USDA_DOMAIN: &str = "https://api.nal.usda.gov/fdc/v1";
static USDA_API_KEY: &str = "g8hkV8fS6A17dTaS0DEk464LisJCu8AdN2gKIU2C";

enum Routes {
    Search,
    FoodDto,
    Foods,
}

impl ToString for Routes {
    fn to_string(&self) -> String {
        match self {
            Routes::Search => format!("{USDA_DOMAIN}/foods/search"),
            Routes::FoodDto => format!("{USDA_DOMAIN}/food"),
            Routes::Foods => format!("{USDA_DOMAIN}/foods"),
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
    #[derive(Serialize)]
    #[serde(rename_all = "camelCase")]
    struct SearchQuery {
        #[serde(rename = "api_key")]
        api_key: String,
        general_search_input: String,
        data_type: String,
        page_number: i32,
        page_size: i32,
    }

    let res = surf::get(Routes::Search.to_string())
        .query(&SearchQuery {
            api_key: USDA_API_KEY.to_string(),
            general_search_input: search.to_string(),
            data_type: "Branded".to_string(),
            page_number: page,
            page_size: 10,
        })?
        .recv_json::<Vec<USDABranndedFoodItemDto>>()
        .await?;

    Ok(())
}

pub async fn get_usda_food_by_id(id: &str) -> Result<FoodDto, Error> {
    #[derive(Serialize)]
    struct FoodQuery {
        api_key: String,
    }

    let res = surf::get(format!("{}/{}", Routes::FoodDto.to_string(), id))
        .query(&FoodQuery {
            api_key: USDA_API_KEY.to_string(),
        })?
        .recv_json::<USDABranndedFoodItemDto>()
        .await?;

    let res = FoodDto::from(res);

    Ok(res)
}

pub async fn get_usda_foods_by_ids(ids: Vec<i32>) -> Result<Vec<FoodDto>, Error> {
    #[derive(Serialize)]
    #[serde(rename_all = "camelCase")]
    struct FoodsQuery {
        #[serde(rename = "api_key")]
        api_key: String,
        fdc_ids: String,
    }

    let ids = &ids
        .iter()
        .map(|id| id.to_string())
        .collect::<Vec<String>>()
        .join(",");

    let res = surf::get(Routes::Foods.to_string())
        .query(&FoodsQuery {
            api_key: USDA_API_KEY.to_string(),
            fdc_ids: ids.to_string(),
        })?
        .recv_json::<Vec<USDABranndedFoodItemDto>>()
        .await?;

    let res = res.into_iter().map(FoodDto::from).collect::<Vec<_>>();

    Ok(res)
}
