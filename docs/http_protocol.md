HTTP: (Hypertext Transfer Protocol - Giao thức truyền tải siêu văn bản)
- HTTP Status Code.
    + 1xx: Thông tin 
       - Nghĩa là yêu cầu đã nhận và tiến trình đang tiếp tục.
    + 2xx: Thành công
       - Nghĩa là hoạt động đã được nhận, được hiểu và đã chấp nhận 1 cách thành công.
       - 200: (Successful) Server xử lý yêu cầu thành công.
       - 201: (Created) Yêu cầu đã thành công và server tạo ra một nguồn tài nguyên mới.
       - 202: (Accepted) Server đã chấp nhận yêu cầu, nhưng vẫn chưa xử lý nó.
       - 203: (Non-authoritative information) Server xử lý yêu cầu thành công, nhưng đang quay trở lại các thông tin mà có thể là từ một nguồn khác.
       - 204: (No Content) Server xử lý yêu cầu thành công, nhưng không trả lại bất kỳ nội dung nào.
       - 205: (Reset Content) Server proccessed yêu cầu thành công, nhưng không trả lại bất kỳ nội dung. Không giống như một phản ứng 204, phản ứng này đòi hỏi người yêu cầu thiết lập lại xem tài liệu.
       - 206: (Partial Content) Server xử lý thành công một phần của một yêu cầu.
    + 3xx: Sự điều hướng lại
       - Nghĩa là hoạt động phải được thực hiện để hoàn thành yêu cầu.
       - 301: (Moved permanently) Các trang web yêu cầu đã bị di chuyển vĩnh viễn tới URL mới.
       - 302: (Moved temporarily) Trang được yêu cầu đã di chuyển tạm thời tới một URL mới.
       - 304: (Not modified) Các trang yêu cầu đã không được sửa đổi kể từ khi yêu cầu cuối cùng. Khi máy chủ trả về phản hồi này, nó không trả lại các nội dung của trang.
    + 4xx: Lỗi Client
       - Nó nghĩa là yêu cầu chứa cú pháp không chính xác hoặc không được thực hiện.
       - 400 (Bad request) Server không hiểu được yêu cầu.
       - 401 (Not authorized) Đề nghị yêu cầu xác thực. Máy chủ có thể trả về phản hồi này yêu cầu xác thực đăng nhập tài khoản và mật khẩu (thông thường máy chủ trả về phản hồi này nếu client gửi request một trang đăng nhập).
       - 403 (Forbidden) Server từ chối yêu cầu.(thông thường nếu đăng nhập không thành công máy chủ sẽ trả về mã lỗi này).
       - 404 (Not found) Server không thể tìm thấy trang yêu cầu. Ví dụ, máy chủ thường trả về mã này nếu có 1 yêu cầu tới một trang không tồn tại trên máy chủ.
       - 405 (Method not allowed) Phương thức được xác định trong yêu cầu là không được cho phép.
       - 406 (Not acceptable) Server chỉ có thể tạo một phản hồi mà không được chấp nhận bởi Client.
       - 407 (Proxy authentication required) Yêu cầu client phải xác thực sử dụng một proxy. Khi máy chủ trả về phản hồi này, nó cũng chỉ ra proxy mà người yêu cầu phải sử dụng.
       - 408 (Request timeout) Request tốn thời gian dài hơn thời gian Server phản hồi.
       - 409 (Conflict) Server gặp phải một cuộc xung đột thực hiện yêu cầu.
       - ...
    + 5xx: Lỗi Server
       - 500 (Internal server error) Server gặp lỗi và không thể thực hiện yêu cầu.
       - 501 (Not implemented) Server không có các chức năng để thực hiện yêu cầu. Ví dụ, máy chủ có thể trả về mã này khi nó không nhận ra phương thức yêu cầu.
       - 502 (Bad gateway) Server đã hoạt động như một gateway hoặc proxy và nhận được một phản ứng không hợp lệ từ máy chủ ngược.
       - 503 (Service unavailable) Server hiện không có sẵn (vì nó bị quá tải hoặc xuống để bảo trì). Nói chung, đây là một trạng thái tạm thời.
       - 504 (Gateway timeout) Server đã hoạt động như một gateway hoặc proxy và đã không nhận được yêu cầu kịp thời từ máy chủ ngược.
       - 505 (HTTP version not supported) Server không hỗ trợ phiên bản giao thức HTTP được sử dụng trong yêu cầu.