exports.mapUserReadDTO = (user) => { // DTO without password
    return {
        id: user.id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        birthday: user.birthday,
        profilePhoto: user.path
    }
}

exports.mapBookReadDTO = (book) => { // DTO with average rating
    const tempAverageRating = Math.round((book.sumOfRatings / book.numOfRatings) * 10) / 10;
    return {
        id: book.id,
        userId: book.userId,
        title: book.title,
        description: book.description,
        author: book.author,
        genre: book.genre,
        language: book.language,
        publishYear: book.publishYear,
        averageRating: isNaN(tempAverageRating) ? 0 : tempAverageRating,
        bookPhoto: book.bookPhoto,
        bookFile: book.bookFile
    }
}
