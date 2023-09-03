use serde::{Deserialize, Serialize};
use serde_json::json;
use tide::{Response, StatusCode};

#[derive(Debug, Serialize, Deserialize)]
pub struct ErrorMessage {
    pub message: String,
    pub error: String,
}

impl ErrorMessage {
    pub fn new(error: &str, message: &str) -> ErrorMessage {
        ErrorMessage {
            message: message.to_string(),
            error: error.to_string(),
        }
    }

    pub fn res(&self, status: StatusCode) -> Response {
        Response::builder(status).body(json!(self)).build()
    }
}

#[macro_export]
macro_rules! error_message {
    ($status:expr, $error:expr, $message:expr) => {
        $crate::controllers::utils::tide::ErrorMessage::new($error, $message).res($status)
    };
}

#[macro_export]
macro_rules! response {
    ($status:expr, $body:expr) => {
        tide::Response::builder($status)
            .body(serde_json::json!($body))
            .build()
    };

    ($status:expr) => {
        tide::Response::builder($status).build()
    };
}
