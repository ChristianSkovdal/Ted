using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Text;

namespace Ted.Server.Interfaces
{
    public interface IConfigRepository
    {
        object Seed();
    }
}
