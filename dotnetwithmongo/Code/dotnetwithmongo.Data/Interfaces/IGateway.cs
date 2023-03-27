using MongoDB.Driver;

namespace dotnetwithmongo.Data.Interfaces
{
    public interface IGateway
    {
        IMongoDatabase GetMongoDB();
    }
}
