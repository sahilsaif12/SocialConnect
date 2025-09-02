import os
from supabase import create_client, Client
from django.conf import settings
from urllib.parse import urlparse

class SupabaseStorage:
    def __init__(self):
        self.url = settings.SUPABASE_URL
        self.key = settings.SUPABASE_SERVICE_KEY or settings.SUPABASE_KEY
        self.client: Client = create_client(self.url, self.key)
    
    def upload_file(self, file, bucket_name, file_path, file_options=None):
        """
        Upload a file to Supabase storage
        
        Args:
            file: Django UploadedFile object or file path
            bucket_name: Name of the storage bucket
            file_path: Path where to store the file in the bucket
            file_options: Additional options for upload
        
        Returns:
            Public URL of the uploaded file
        """
        try:

            existing_files = self.client.storage.from_(bucket_name).get_public_url(file_path)
            if existing_files:
                self.delete_file(bucket_name,file_path)

            # If file is a Django UploadedFile object
            if hasattr(file, 'read'):
                file_content = file.read()
            else:
                # If file is a path string
                with open(file, 'rb') as f:
                    file_content = f.read()
            
            # print("file read",file_content)
            # Upload the file
            response = self.client.storage.from_(bucket_name).upload(
                path=file_path,
                file=file_content,
                file_options=file_options or {}
            )
            
            # Get public URL
            public_url = self.client.storage.from_(bucket_name).get_public_url(file_path)
            
            return {
                'success': True,
                'public_url': public_url,
                'file_path': file_path
            }
            
        except Exception as e:
            print(e)
            return {
                'success': False,
                'error': str(e)
            }
    
    def delete_file(self, bucket_name, file_path):
        """Delete a file from Supabase storage"""
        try:
            response = self.client.storage.from_(bucket_name).remove([file_path])
            return {'success': True}
        except Exception as e:
            return {'success': False, 'error': str(e)}
    
    def list_files(self, bucket_name, folder_path=""):
        """List files in a bucket"""
        try:
            response = self.client.storage.from_(bucket_name).list(folder_path)
            return {'success': True, 'files': response}
        except Exception as e:
            return {'success': False, 'error': str(e)}
    
    def get_public_url(self, bucket_name, file_path):
        """Get public URL for a file"""
        try:
            public_url = self.client.storage.from_(bucket_name).get_public_url(file_path)
            return {'success': True, 'public_url': public_url}
        except Exception as e:
            return {'success': False, 'error': str(e)}