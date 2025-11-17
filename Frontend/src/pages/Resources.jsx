import React, { useState } from "react";
import {
  FaPlay,
  FaHeadphones,
  FaBookOpen,
  FaSearch,
  FaFilter,
  FaClock,
  FaStar,
  FaTags,
  FaHeart,
  FaBrain,
  FaLeaf,
  FaMusic,
  FaVideo,
  FaMicrophone,
} from "react-icons/fa";
import Navbar from "../components/Navbar";

const Resources = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const categories = [
    { id: "all", name: "All Resources", icon: FaTags, color: "gray" },
    { id: "stress", name: "Stress Management", icon: FaBrain, color: "red" },
    { id: "anxiety", name: "Anxiety Relief", icon: FaHeart, color: "orange" },
    {
      id: "focus",
      name: "Focus & Concentration",
      icon: FaLeaf,
      color: "green",
    },
    { id: "sleep", name: "Sleep & Relaxation", icon: FaClock, color: "blue" },
    { id: "mindfulness", name: "Mindfulness", icon: FaLeaf, color: "purple" },
    { id: "motivation", name: "Motivation", icon: FaStar, color: "yellow" },
  ];

  const resourceTypes = [
    { id: "all", name: "All Types", icon: FaTags },
    { id: "video", name: "Videos", icon: FaVideo },
    { id: "audio", name: "Audio/Music", icon: FaMusic },
    { id: "recording", name: "Guided Sessions", icon: FaMicrophone },
    { id: "article", name: "Articles", icon: FaBookOpen },
  ];

  // Sample resources data - in a real app, this would come from an API
  const resources = [
    {
      id: 1,
      title: "Deep Breathing for Stress Relief",
      type: "video",
      category: "stress",
      duration: "10 mins",
      rating: 4.8,
      thumbnail: "/api/placeholder/300/200",
      description:
        "Learn effective breathing techniques to manage stress and anxiety.",
      tags: ["breathing", "quick relief", "beginner-friendly"],
    },
    {
      id: 2,
      title: "Focus Music - Binaural Beats",
      type: "audio",
      category: "focus",
      duration: "45 mins",
      rating: 4.6,
      thumbnail: "/api/placeholder/300/200",
      description:
        "Scientifically designed music to enhance concentration and productivity.",
      tags: ["study music", "concentration", "binaural beats"],
    },
    {
      id: 3,
      title: "Progressive Muscle Relaxation",
      type: "recording",
      category: "sleep",
      duration: "25 mins",
      rating: 4.9,
      thumbnail: "/api/placeholder/300/200",
      description:
        "Guided session to release physical tension and prepare for restful sleep.",
      tags: ["sleep aid", "relaxation", "guided meditation"],
    },
    {
      id: 4,
      title: "Understanding Anxiety: A Student Guide",
      type: "article",
      category: "anxiety",
      duration: "8 min read",
      rating: 4.7,
      thumbnail: "/api/placeholder/300/200",
      description:
        "Comprehensive guide to understanding and managing anxiety in academic settings.",
      tags: ["education", "anxiety management", "student tips"],
    },
    {
      id: 5,
      title: "Morning Mindfulness Routine",
      type: "video",
      category: "mindfulness",
      duration: "15 mins",
      rating: 4.8,
      thumbnail: "/api/placeholder/300/200",
      description: "Start your day with intention and mindfulness practices.",
      tags: ["morning routine", "mindfulness", "daily practice"],
    },
    {
      id: 6,
      title: "Calming Rain Sounds",
      type: "audio",
      category: "sleep",
      duration: "60 mins",
      rating: 4.5,
      thumbnail: "/api/placeholder/300/200",
      description: "Natural rain sounds to help you relax and fall asleep.",
      tags: ["nature sounds", "sleep", "ambient"],
    },
    {
      id: 7,
      title: "Exam Anxiety Management",
      type: "recording",
      category: "anxiety",
      duration: "20 mins",
      rating: 4.9,
      thumbnail: "/api/placeholder/300/200",
      description:
        "Guided techniques specifically for managing test and exam anxiety.",
      tags: ["exam stress", "anxiety relief", "student support"],
    },
    {
      id: 8,
      title: "Building Resilience in College",
      type: "article",
      category: "motivation",
      duration: "12 min read",
      rating: 4.6,
      thumbnail: "/api/placeholder/300/200",
      description:
        "Strategies for building mental resilience during challenging academic periods.",
      tags: ["resilience", "college life", "mental strength"],
    },
  ];

  const filteredResources = resources.filter((resource) => {
    const matchesCategory =
      selectedCategory === "all" || resource.category === selectedCategory;
    const matchesType =
      selectedType === "all" || resource.type === selectedType;
    const matchesSearch =
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );

    return matchesCategory && matchesType && matchesSearch;
  });

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

  const getCategoryStyle = (categoryId) => {
    const colorMap = {
      all: "bg-gray-100 text-gray-800 border-gray-300",
      stress: "bg-red-100 text-red-800 border-red-300",
      anxiety: "bg-orange-100 text-orange-800 border-orange-300",
      focus: "bg-green-100 text-green-800 border-green-300",
      sleep: "bg-blue-100 text-blue-800 border-blue-300",
      mindfulness: "bg-purple-100 text-purple-800 border-purple-300",
      motivation: "bg-yellow-100 text-yellow-800 border-yellow-300",
    };
    return colorMap[categoryId] || colorMap["all"];
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="pt-20 px-4 max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Mental Health Resources
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover guided meditations, focus music, educational content, and
              relaxation tools designed to support your mental well-being and
              academic success.
            </p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search resources, techniques, or topics..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Resource Type Filter */}
            <div className="flex gap-2 flex-wrap">
              {resourceTypes.map((type) => {
                const IconComponent = type.icon;
                return (
                  <button
                    key={type.id}
                    onClick={() => setSelectedType(type.id)}
                    className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors ${
                      selectedType === type.id
                        ? "bg-blue-100 text-blue-800 border-2 border-blue-300"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200 border-2 border-transparent"
                    }`}
                  >
                    <IconComponent />
                    {type.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-3 mt-4">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors ${
                    selectedCategory === category.id
                      ? getCategoryStyle(category.id)
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200 border-2 border-transparent"
                  }`}
                >
                  <IconComponent />
                  {category.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Counter */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredResources.length}{" "}
            {filteredResources.length === 1 ? "resource" : "resources"}
            {selectedCategory !== "all" && (
              <span>
                {" "}
                in {categories.find((c) => c.id === selectedCategory)?.name}
              </span>
            )}
            {selectedType !== "all" && (
              <span>
                {" "}
                • {resourceTypes.find((t) => t.id === selectedType)?.name}
              </span>
            )}
          </p>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {filteredResources.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <div className="text-gray-400 mb-4">
                <FaSearch size={48} className="mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No resources found
              </h3>
              <p className="text-gray-600">
                Try adjusting your search or filter criteria
              </p>
            </div>
          ) : (
            filteredResources.map((resource) => {
              const TypeIcon = getTypeIcon(resource.type);
              return (
                <div
                  key={resource.id}
                  className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow overflow-hidden group cursor-pointer"
                  onClick={() =>
                    (window.location.href = `/resources/${resource.id}`)
                  }
                >
                  {/* Thumbnail */}
                  <div className="relative">
                    <div className="w-full h-48 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                      <TypeIcon size={40} className="text-blue-600" />
                    </div>
                    <div className="absolute top-3 left-3">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(
                          resource.type
                        )}`}
                      >
                        <TypeIcon className="inline mr-1" size={10} />
                        {resource.type.charAt(0).toUpperCase() +
                          resource.type.slice(1)}
                      </span>
                    </div>
                    <div className="absolute top-3 right-3">
                      <span className="bg-black bg-opacity-75 text-white px-2 py-1 text-xs rounded">
                        {resource.duration}
                      </span>
                    </div>
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="bg-blue-600 text-white p-3 rounded-full">
                          <FaPlay size={16} />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                      {resource.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {resource.description}
                    </p>

                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-3">
                      <FaStar className="text-yellow-400" size={14} />
                      <span className="text-sm font-medium text-gray-700">
                        {resource.rating}
                      </span>
                      <span className="text-sm text-gray-500">
                        ({Math.floor(Math.random() * 500) + 100} reviews)
                      </span>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {resource.tags.slice(0, 2).map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
                        >
                          {tag}
                        </span>
                      ))}
                      {resource.tags.length > 2 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                          +{resource.tags.length - 2}
                        </span>
                      )}
                    </div>

                    {/* Action Button */}
                    <button
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.location.href = `/resources/${resource.id}`;
                      }}
                    >
                      {resource.type === "article" ? (
                        <>
                          <FaBookOpen size={14} />
                          Read Article
                        </>
                      ) : resource.type === "audio" ? (
                        <>
                          <FaHeadphones size={14} />
                          Listen Now
                        </>
                      ) : (
                        <>
                          <FaPlay size={14} />
                          Play Now
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Quick Access Section */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Quick Relief Tools
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg text-center">
              <div className="bg-blue-600 text-white p-3 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <FaBrain />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                5-Minute Stress Relief
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Quick breathing exercises for immediate stress relief
              </p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                Start Now
              </button>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg text-center">
              <div className="bg-green-600 text-white p-3 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <FaLeaf />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Focus Booster
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Background music designed to enhance concentration
              </p>
              <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                Play Music
              </button>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg text-center">
              <div className="bg-purple-600 text-white p-3 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <FaClock />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Sleep Preparation
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Guided relaxation to prepare for restful sleep
              </p>
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                Begin Session
              </button>
            </div>
          </div>
        </div>

        {/* Popular Categories */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Popular Categories
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {categories
              .filter((cat) => cat.id !== "all")
              .map((category) => {
                const IconComponent = category.icon;
                const categoryResources = resources.filter(
                  (r) => r.category === category.id
                );
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className="p-4 text-center hover:bg-gray-50 rounded-lg transition-colors group"
                  >
                    <div
                      className={`w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform ${getCategoryStyle(
                        category.id
                      )}`}
                    >
                      <IconComponent />
                    </div>
                    <h3 className="font-medium text-gray-900 text-sm mb-1">
                      {category.name}
                    </h3>
                    <p className="text-xs text-gray-500">
                      {categoryResources.length} resources
                    </p>
                  </button>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resources;
