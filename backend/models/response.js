function Response(code, err, data)
{
    this.status = code;
    this.errorMessage = (err)? ((err.message)? err.message : err) : "";
    this.responseData = (data)? data : "";
}
module.exports = Response;
