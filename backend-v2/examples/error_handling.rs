/// ```
/// enum StatusCode {
///     NotFound = 404,
///     InternalServerError = 500,
/// }
/// 
/// let food = match food_repo::get_by_id(connection, food_id).await {
///     Ok(Some(food)) => food,
///     Ok(None) => {
///         return Ok(error_message!(
///             StatusCode::NotFound,
///             "no-food",
///             "No food found with that id."
///         ))
///     }
///     Err(_) => return Err(error!(StatusCode::InternalServerError, "Error")),
/// };
/// 
/// let Some(food) = food_repo::get_by_id(connection, food_id).await.map_err_to_server_error()? else {
///     return Ok(error_message!(
///         StatusCode::NotFound,
///         "no-food",
///         "No food found with that id."
///     ))
/// };
/// ```