using Google.Apis.Auth.OAuth2;
using Google.Apis.Auth.OAuth2.Flows;
using Google.Apis.Auth.OAuth2.Responses;
using Google.Apis.Drive.v3;
using Google.Apis.Services;
using Google.Apis.Util.Store;

using static Google.Apis.Drive.v3.DriveService;

class GoogleDriveService
{

    public static DriveService GetService()
    {
        var tokenResponse = new TokenResponse
        {
            AccessToken = "ya29.a0AfB_byBcTIK0JfTpU9NtrTshpQA3hIFhjjyTNpYDk8YjVaP5yHK0y3YO7qg80wpLgtV7mj_O2QZlFal2GTLn30GaqqTnm_vhXm-HxeH-V5B6qUmXQ7KeQI8J-MdA7iIRXLh_ZXyHxX38XNUJTus_1__qfEwUlEtYlQaCgYKAdYSARISFQGOcNnCg1kssXWhoBH3BvWZ0mfKMg0169",
            RefreshToken = "1//04YQ4JftICj53CgYIARAAGAQSNwF-L9IrqYbYD1w69-dgmp2md8AOqPZ6uVDbr_eUir8aTc2fpiH8Oa3HXyAMf5MmizEE6c_fm08",
        };


        var applicationName = "emotEApp"; // Use the name of the project in Google Cloud
        var username = "emote.app.backend@gmail.com"; // Use your email


        var apiCodeFlow = new GoogleAuthorizationCodeFlow(new GoogleAuthorizationCodeFlow.Initializer
        {
            ClientSecrets = new ClientSecrets
            {
                ClientId = "670029630845-rneo6eh9f2oghpe8ueeb866rl1a3a0k3.apps.googleusercontent.com",
                ClientSecret = "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"
            },
            Scopes = new[] { Scope.Drive },
            DataStore = new FileDataStore(applicationName)
        });


        var credential = new UserCredential(apiCodeFlow, username, tokenResponse);


        var service = new DriveService(new BaseClientService.Initializer
        {
            HttpClientInitializer = credential,
            ApplicationName = applicationName
        });



        return service;
    }

    public string CreateFolder(string parent, string folderName)
    {
        var service = GetService();
        var driveFolder = new Google.Apis.Drive.v3.Data.File
        {
            Name = folderName,
            MimeType = "application/vnd.google-apps.folder",
            Parents = new string[] { parent }
        };
        var command = service.Files.Create(driveFolder);
        var file = command.Execute();
        return file.Id;
    }

    public string UploadFile(Stream file, string fileName, string fileMime, string folder, string fileDescription)
    {
        DriveService service = GetService();

        var driveFile = new Google.Apis.Drive.v3.Data.File
        {
            Name = fileName,
            Description = fileDescription,
            MimeType = fileMime,
            Parents = new string[] { folder }
        };

        //check if file exists
        var fileList = GetFiles(folder);
        var foundFile = fileList.Where(f => f.Name == fileName).FirstOrDefault();

        if (foundFile != null)
        {
            //file exists, update it
            driveFile.Parents = null;
            var request = service.Files.Update(driveFile, foundFile.Id, file, fileMime);
            request.Fields = "id";
            var response = request.Upload();
            if (response.Status != Google.Apis.Upload.UploadStatus.Completed) throw response.Exception;
            return foundFile.Id;
        }
        else
        {
            var request = service.Files.Create(driveFile, file, fileMime);
            request.Fields = "id";
            var response = request.Upload();
            if (response.Status != Google.Apis.Upload.UploadStatus.Completed) throw response.Exception;
            return request.ResponseBody.Id;
        }



    }

    public IEnumerable<Google.Apis.Drive.v3.Data.File> GetFiles(string folder)
    {
        var service = GetService();

        var fileList = service.Files.List();
        fileList.Q = $"mimeType!='application/vnd.google-apps.folder' and '{folder}' in parents";
        fileList.Fields = "nextPageToken, files(id, name, size, mimeType)";

        var result = new List<Google.Apis.Drive.v3.Data.File>();
        string pageToken = null;
        do
        {
            fileList.PageToken = pageToken;
            var filesResult = fileList.Execute();
            var files = filesResult.Files;
            pageToken = filesResult.NextPageToken;
            result.AddRange(files);
        } while (pageToken != null);


        return result;
    }
    public void DeleteFile(string fileId)
    {
        var service = GetService();
        var command = service.Files.Delete(fileId);
        var result = command.Execute();
    }
}