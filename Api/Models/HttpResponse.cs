using System;
using System.Collections.Generic;
using System.IO;

namespace Api.Models
{
    public class HttpResponse
    {
        public string msg { get; set; }
        public int statusCode { get; set; }
        public bool ok{ get; set; }
        public dynamic response { get; set; }

    }
}