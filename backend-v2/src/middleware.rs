/// use tide::log;
/// use tide::{Middleware, Next, Request, Result};
///
/// #[derive(Debug, Default, Clone)]
/// pub struct LogMiddleware;
///
/// impl LogMiddleware {
///     pub fn new() -> Self {
///         Self
///     }
///
///     async fn log<'a, State: Clone + Send + Sync + 'static>(
///         &'a self,
///         req: Request<State>,
///         next: Next<'a, State>,
///     ) -> Result {
///         let path = req.url().path().to_owned();
///         let method = req.method().to_string();
///         log::info!("<-- Request received", {
///             method: method,
///             path: path,
///         });
///         let start = std::time::Instant::now();
///         let response = next.run(req).await;
///         let status = response.status();
///         if status.is_server_error() {
///             if let Some(error) = response.error() {
///                 log::error!("Internal error --> Response sent", {
///                     message: format!("{:?}", error),
///                     error_type: error.type_name(),
///                     method: method,
///                     path: path,
///                     status: format!("{} - {}", status as u16, status.canonical_reason()),
///                     duration: format!("{:?}", start.elapsed()),
///                 });
///             } else {
///                 log::error!("Internal error --> Response sent", {
///                     method: method,
///                     path: path,
///                     status: format!("{} - {}", status as u16, status.canonical_reason()),
///                     duration: format!("{:?}", start.elapsed()),
///                 });
///             }
///         } else if status.is_client_error() {
///             if let Some(error) = response.error() {
///                 log::warn!("Client error --> Response sent", {
///                     message: format!("{:?}", error),
///                     error_type: error.type_name(),
///                     method: method,
///                     path: path,
///                     status: format!("{} - {}", status as u16, status.canonical_reason()),
///                     duration: format!("{:?}", start.elapsed()),
///                 });
///             } else {
///                 log::warn!("Client error --> Response sent", {
///                     method: method,
///                     path: path,
///                     status: format!("{} - {}", status as u16, status.canonical_reason()),
///                     duration: format!("{:?}", start.elapsed()),
///                 });
///             }
///         } else {
///             log::info!("--> Response sent", {
///                 method: method,
///                 path: path,
///                 status: format!("{} - {}", status as u16, status.canonical_reason()),
///                 duration: format!("{:?}", start.elapsed()),
///             });
///         }
///         Ok(response)
///     }
/// }
///
/// #[async_trait::async_trait]
/// impl<State: Clone + Send + Sync + 'static> Middleware<State> for LogMiddleware {
///     async fn handle(&self, req: Request<State>, next: Next<'_, State>) -> crate::Result {
///         self.log(req, next).await
///     }
/// }
pub struct LogMiddleware;
