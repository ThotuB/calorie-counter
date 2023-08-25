use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct ErrorMessage {
    pub error: String,
    pub message: String,
}

impl ErrorMessage {
    pub fn new(error: &str, message: &str) -> ErrorMessage {
        ErrorMessage {
            error: error.to_string(),
            message: message.to_string(),
        }
    }
}

#[macro_export]
macro_rules! error_message {
    ($status:expr, $message:expr, $error:expr) => {
        tide::Response::builder($status)
            .body(json!(crate::controllers::utils::tide::ErrorMessage::new(
                $message, $error
            )))
            .build()
    };
}

#[macro_export]
macro_rules! response {
    ($status:expr, $body:expr) => {
        tide::Response::builder($status).body(json!($body)).build()
    };
}

#[macro_export]
macro_rules! error {
    ($status:expr, $message:expr) => {
        tide::Error::from_str($status, $message)
    };
}
