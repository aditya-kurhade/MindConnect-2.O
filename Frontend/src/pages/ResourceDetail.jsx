import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaPlay,
  FaPause,
  FaHeadphones,
  FaBookOpen,
  FaStar,
  FaDownload,
  FaShare,
  FaHeart,
  FaClock,
  FaTags,
  FaUser,
  FaMusic,
  FaVideo,
  FaMicrophone,
  FaVolumeUp,
  FaVolumeMute,
} from "react-icons/fa";
import Navbar from "../components/Navbar";

const ResourceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration] = useState(300); // 5 minutes default
  const [volume, setVolume] = useState(0.7);

  // Sample resource data - in a real app, this would be fetched from an API
  const resource = {
    id: parseInt(id),
    title: "Deep Breathing for Stress Relief",
    type: "video",
    category: "stress",
    duration: "10 mins",
    rating: 4.8,
    reviewCount: 234,
    views: 1542,
    instructor: "Dr. Sarah Chen",
    instructorBio:
      "Licensed therapist specializing in stress management and mindfulness techniques",
    description:
      "Learn effective breathing techniques to manage stress and anxiety. This guided session will teach you practical methods to calm your mind and reduce physical tension through controlled breathing exercises.",
    fullDescription: `This comprehensive breathing session is designed specifically for students dealing with academic stress and anxiety. You'll learn three powerful breathing techniques:

1. **4-7-8 Breathing**: A technique that naturally calms the nervous system
2. **Box Breathing**: Used by Navy SEALs for focus and stress management
3. **Alternate Nostril Breathing**: An ancient practice to balance your mind

Each technique is explained clearly with step-by-step guidance, making it perfect for beginners. Regular practice of these methods can help you:

- Reduce stress and anxiety levels
- Improve concentration and focus
- Better manage exam pressure
- Enhance sleep quality
- Develop emotional resilience

The session includes both guided practice and a quiet practice segment where you can apply the techniques independently. Perfect for use during study breaks or before exams.`,
    tags: [
      "breathing",
      "quick relief",
      "beginner-friendly",
      "stress management",
      "anxiety",
    ],
    thumbnail: "/api/placeholder/800/450",
    videoUrl: "/api/placeholder/video",
    audioUrl: "/api/placeholder/audio",
    difficulty: "Beginner",
    language: "English",
    transcript: `Welcome to this deep breathing session for stress relief. Find a comfortable position and let's begin...

[0:30] First, let's understand why breathing is so powerful for managing stress...

[1:15] Now, let's start with our first technique: 4-7-8 breathing...

[3:45] Excellent. Now let's move to box breathing...

[6:20] Finally, we'll practice alternate nostril breathing...

[8:30] Take a moment to notice how you feel now compared to when we started...

[9:45] Remember, practice makes perfect. Use these techniques whenever you feel stressed...`,
    relatedResources: [
      {
        id: 2,
        title: "Progressive Muscle Relaxation",
        type: "recording",
        duration: "25 mins",
        rating: 4.9,
      },
      {
        id: 3,
        title: "Mindful Study Techniques",
        type: "article",
        duration: "6 min read",
        rating: 4.7,
      },
      {
        id: 4,
        title: "Calming Nature Sounds",
        type: "audio",
        duration: "60 mins",
        rating: 4.6,
      },
    ],
  };

  useEffect(() => {
    // Simulate progress for demo
    if (isPlaying) {
      const interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isPlaying, duration]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case "video":
        return FaVideo;
      case "audio":
        return FaMusic;
      case "recording":
        return FaMicrophone;
      case "article":
        return FaBookOpen;
      default:
        return FaTags;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case "video":
        return "bg-red-100 text-red-800";
      case "audio":
        return "bg-blue-100 text-blue-800";
      case "recording":
        return "bg-green-100 text-green-800";
      case "article":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (!resource) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="pt-20 px-4 max-w-4xl mx-auto text-center py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Resource not found
          </h2>
          <button
            onClick={() => navigate("/resources")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
          >
            Back to Resources
          </button>
        </div>
      </div>
    );
  }

  const TypeIcon = getTypeIcon(resource.type);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="pt-20 px-4 max-w-6xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate("/resources")}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6 transition-colors"
        >
          <FaArrowLeft />
          Back to Resources
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Media Player */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
              {resource.type === "article" ? (
                <div className="bg-gradient-to-br from-purple-100 to-blue-100 p-12 text-center">
                  <FaBookOpen
                    size={64}
                    className="text-purple-600 mx-auto mb-4"
                  />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Article Content
                  </h3>
                  <p className="text-gray-600">
                    Scroll down to read the full article
                  </p>
                </div>
              ) : (
                <div className="relative">
                  {/* Video/Audio Player UI */}
                  <div className="bg-gradient-to-br from-blue-100 to-purple-100 aspect-video flex items-center justify-center relative">
                    <TypeIcon size={80} className="text-blue-600" />

                    {/* Play/Pause Button */}
                    <button
                      onClick={togglePlayPause}
                      className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 hover:bg-opacity-20 transition-opacity group"
                    >
                      <div className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full transition-colors">
                        {isPlaying ? (
                          <FaPause size={24} />
                        ) : (
                          <FaPlay size={24} />
                        )}
                      </div>
                    </button>

                    {/* Volume Control */}
                    <div className="absolute top-4 right-4 flex items-center gap-2 bg-black bg-opacity-50 px-3 py-2 rounded-lg">
                      <button
                        onClick={() => setIsMuted(!isMuted)}
                        className="text-white hover:text-blue-300 transition-colors"
                      >
                        {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
                      </button>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={isMuted ? 0 : volume}
                        onChange={(e) => setVolume(parseFloat(e.target.value))}
                        className="w-16"
                      />
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="p-4 bg-white">
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-gray-600">
                        {formatTime(currentTime)}
                      </span>
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all"
                          style={{
                            width: `${(currentTime / duration) * 100}%`,
                          }}
                        />
                      </div>
                      <span className="text-sm text-gray-600">
                        {formatTime(duration)}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Resource Info */}
            <div className="bg-white rounded-lg shadow-sm p-8 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <span
                  className={`px-3 py-1 text-sm font-medium rounded-full ${getTypeColor(
                    resource.type
                  )}`}
                >
                  <TypeIcon className="inline mr-1" size={12} />
                  {resource.type.charAt(0).toUpperCase() +
                    resource.type.slice(1)}
                </span>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                  {resource.category.charAt(0).toUpperCase() +
                    resource.category.slice(1)}
                </span>
                <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                  {resource.difficulty}
                </span>
              </div>

              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {resource.title}
              </h1>

              <div className="flex items-center gap-6 mb-6 text-gray-600">
                <div className="flex items-center gap-1">
                  <FaStar className="text-yellow-400" />
                  <span className="font-medium">{resource.rating}</span>
                  <span>({resource.reviewCount} reviews)</span>
                </div>
                <div className="flex items-center gap-1">
                  <FaClock />
                  <span>{resource.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <FaUser />
                  <span>{resource.views} views</span>
                </div>
              </div>

              <p className="text-gray-700 mb-6 leading-relaxed">
                {resource.description}
              </p>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors">
                  <FaHeart />
                  Add to Favorites
                </button>
                <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium flex items-center gap-2 hover:bg-gray-50 transition-colors">
                  <FaDownload />
                  Download
                </button>
                <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium flex items-center gap-2 hover:bg-gray-50 transition-colors">
                  <FaShare />
                  Share
                </button>
              </div>
            </div>

            {/* Detailed Description */}
            <div className="bg-white rounded-lg shadow-sm p-8 mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                About This Session
              </h2>
              <div className="prose max-w-none text-gray-700">
                {resource.fullDescription
                  .split("\n")
                  .map((paragraph, index) => (
                    <p key={index} className="mb-4 last:mb-0">
                      {paragraph}
                    </p>
                  ))}
              </div>
            </div>

            {/* Transcript */}
            {resource.type !== "article" && (
              <div className="bg-white rounded-lg shadow-sm p-8 mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Transcript
                </h2>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="text-gray-700 whitespace-pre-line font-mono text-sm">
                    {resource.transcript}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Instructor Info */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Instructor
              </h3>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                  {resource.instructor
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">
                    {resource.instructor}
                  </h4>
                  <p className="text-gray-600 text-sm">Licensed Therapist</p>
                </div>
              </div>
              <p className="text-gray-700 text-sm">{resource.instructorBio}</p>
            </div>

            {/* Details */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration</span>
                  <span className="font-medium">{resource.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Difficulty</span>
                  <span className="font-medium">{resource.difficulty}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Language</span>
                  <span className="font-medium">{resource.language}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Category</span>
                  <span className="font-medium capitalize">
                    {resource.category}
                  </span>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {resource.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Related Resources */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Related Resources
              </h3>
              <div className="space-y-4">
                {resource.relatedResources.map((related) => {
                  const RelatedIcon = getTypeIcon(related.type);
                  return (
                    <div
                      key={related.id}
                      className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
                      onClick={() => navigate(`/resources/${related.id}`)}
                    >
                      <div
                        className={`p-2 rounded-lg ${getTypeColor(
                          related.type
                        )}`}
                      >
                        <RelatedIcon size={16} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 text-sm mb-1">
                          {related.title}
                        </h4>
                        <div className="flex items-center gap-2 text-xs text-gray-600">
                          <span>{related.duration}</span>
                          <span>•</span>
                          <div className="flex items-center gap-1">
                            <FaStar className="text-yellow-400" size={10} />
                            <span>{related.rating}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourceDetail;
