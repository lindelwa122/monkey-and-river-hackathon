const Profile = require('../models/profile');
const User = require('../models/user');
const UserSerializer = require('../serializers/user_serializer.js');
const ProfileSerializer = require('../serializers/profile_serializer.js');
const { combineJson, createError } = require('../utils');
const { body, validationResult } = require('express-validator');
const asyncHandler = require('express-async-handler');

exports.getProfile = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.body.user_id).exec();
    const profile = await Profile.find({ user_id: user._id }).exec();

    const serializedUser = new UserSerializer(user);
    serializedUser.include('first_name last_name')

    const serializedProfile = new ProfileSerializer(profile);
    serializedProfile.include('one_more_thing another thing');

    res.status(200).json({
        profile: combineJson(serializedUser.getJSON(), serializedProfile.getJSON()),
    });
});

const validateFirstName = () => {
    return [
        body('first_name')
        .trim()
        .isLength({ min: 3, max: 100})
        .exists()
    ];
}

const validateLastName = () => {
    return [
        body('last_name')
        .trim()
        .isLength({ min: 3, max: 100})
        .exists()
    ];
}

const validateEmail = () => {
    return [
        body('email')
        .trim()
        .isLength({ min: 3, max: 100})
        .exists()
    ];
}

const validatePassword = () => {
    return [
        body('password')
        .trim()
        .isLength({ min: 3, max: 50})
        .exists()
    ];
}

const validateOneMoreThing = () => {
    return [
        body('one_more_thing')
        .trim()
        .isLength({ min: 3, max: 100})
        .exists()
    ];
}
const validateLastThing = () => {
    return [
        body('last_thing')
        .trim()
        .isLength({ min: 3, max: 100})
        .exists()
    ];
}

const validateUserId = () => {
    return [
        body('user_id')
        .trim()
        .isLength({ min: 3, max: 100})
        .exists()
    ];
}

exports.updateFirstName = [
    validateUserId(),
    validateFirstName(),

    asyncHandler(async (req, res, next) => {
        const user = new User({
            first_name: req.body.first_name
        });

        const errors = validationResult(req);
        if (!errors.isEmpty) {
            return createError(
                next,
                'The body has invalid information!'
            );
        } 

        const updatedUser = await User.findByIdAndUpdate(req.body.user_id, user, {});

        if (updatedUser) {
            res.status(200).json({
                message: 'First name updated successfully!',
            });
        } else {
            return createError(next, "First name wasn't updated!", 500);
        }
    })
];

exports.updateLastName = [
    validateUserId(),
    validateLastName(),

    asyncHandler(async (req, res, next) => {
        const user = new User({
            last_name: req.body.last_name
        });

        const errors = validationResult(req);
        if (!errors.isEmpty) {
            return createError(
                next,
                'The body has invalid information!'
            );
        } 

        const updatedUser = await User.findByIdAndUpdate(req.body.user_id, user, {});

        if (updatedUser) {
            res.status(200).json({
                message: 'Last name updated successfully!',
            });
        } else {
            return createError(next, "Last name wasn't updated!", 500);
        }
    })
];

exports.updateEmail = [
    validateUserId(),
    validateEmail(),

    asyncHandler(async (req, res, next) => {
        const user = new User({
            email: req.body.email
        });

        const errors = validationResult(req);
        if (!errors.isEmpty) {
            return createError(
                next,
                'The body has invalid information!'
            );
        } 

        const updatedUser = await User.findByIdAndUpdate(req.body.user_id, user, {});

        if (updatedUser) {
            res.status(200).json({
                message: 'Email updated successfully!',
            });
        } else {
            return createError(next, "Email wasn't updated!", 500);
        }
    })
];

exports.updatePassword = [
    validateUserId(),
    validatePassword(),

    asyncHandler(async (req, res, next) => {
        const user = new User({
            password: req.body.password
        });

        const errors = validationResult(req);
        if (!errors.isEmpty) {
            return createError(
                next,
                'The body has invalid information!'
            );
        } 

        const updatedUser = await User.findByIdAndUpdate(req.body.user_id, user, {});

        if (updatedUser) {
            res.status(200).json({
                message: 'Password updated successfully!',
            });
        } else {
            return createError(next, "Password wasn't updated!", 500);
        }
    })
];
