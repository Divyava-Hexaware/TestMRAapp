using dotnetwithmongo.Data.Installer;
using Microsoft.Extensions.DependencyInjection;
using Scrutor;
namespace dotnetwithmongo.BusinessServices.Installer
{
    public class ServiceInstaller
    {
        private readonly IServiceCollection _service;
        public ServiceInstaller(IServiceCollection service)
        {
            _service = service;
        }

        public void Install()
        {
            _service.Scan(scan => scan
                                    .FromAssemblyOf<ServiceInstaller>()
                                    .AddClasses()
                                    .AsImplementedInterfaces()
                                    .WithScopedLifetime());
            var dataInstaller = new DataInstaller(_service);
            dataInstaller.Install();
        }
    }
}
