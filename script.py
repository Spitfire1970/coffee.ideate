import os
import shutil

def find_and_copy_videos(source_folder, destination_folder):
    """
    Recursively finds all video files in a source folder and copies them
    to a destination folder.

    Args:
        source_folder (str): The path to the folder to search for videos.
        destination_folder (str): The path to the folder where videos will be copied.
    """
    video_extensions = ['.mp4', '.mkv', '.avi', '.mov', '.wmv', '.flv', '.webm']
    
    # Create the destination folder if it doesn't already exist
    os.makedirs(destination_folder, exist_ok=True)
    
    copied_files = []

    for root, _, files in os.walk(source_folder):
        for file in files:
            if any(file.lower().endswith(ext) for ext in video_extensions):
                source_path = os.path.join(root, file)
                try:
                    shutil.copy(source_path, destination_folder)
                    copied_files.append(source_path)
                    print(f"Copied: {source_path}")
                except shutil.SameFileError:
                    print(f"Skipped (source and destination are the same): {source_path}")
                except Exception as e:
                    print(f"Error copying {source_path}: {e}")

    print(f"\n✅ Finished! Copied {len(copied_files)} video files to {destination_folder}.")

# --- Example Usage ---
# ❗️ Replace with your actual source and destination folder paths.
# For Windows, paths might look like: 'C:\\Users\\YourUser\\Videos\\Source'

source = '/Users/spitfire/mac_screenshots:screen_recordings'
destination = '/Users/spitfire/projects_ongoing/ideate-spark-reel/public/videos'

find_and_copy_videos(source, destination)