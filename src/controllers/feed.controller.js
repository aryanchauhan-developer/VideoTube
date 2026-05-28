import { Post } from "../models/post.models.js";
import { Subscription } from "../models/subscription.models.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asynchandler } from "../utils/asynchandler.js";
import { ApiError } from "../utils/ApiError.js";

const getHomeFeed = asynchandler(async (req, res) => {
  const subscriptions = await Subscription.find({
    subscriber: req.user._id
  })

  const channelIds = subscriptions.map((sub) => sub.channel)

  console.log(channelIds)

  const posts = await Post.aggregate([
    {
      $match: {
        owner: {
          $in: channelIds
        }
      }
    },
    {
      $lookup: {
        from: "likes",
        localField: "_id",
        foreignField: "post",
        as: "likes"
      }
    },
    {
      $addFields: {
        likesCount: {
          $size: "$likes"
        }
      }
    },
    {
      $lookup: {
        from: "users",
        localField: "owner",
        foreignField: "_id",
        as: "owner"
      }
    },
    {
      $unwind: "$owner"
    }, 
    {
      $project: {
        caption: 1,
        media: 1,
        mediaType: 1,
        createdAt:1,
        likesCount: 1,

        owner: {
          username: "$owner.username",
          fullName: "$owner.fullName",
          avatar: "$owner.avatar",
        }
      }
    },
  ])

  if(!posts?.length){
    throw new ApiError(404, "posts does not exists")
  }

  return res
  .status(200)
  .json(new ApiResponse(200, posts, "Feed fetched successfully"))
})

export {
  getHomeFeed
}