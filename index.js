const fs = require('fs'); // Ensure the fs module is imported
const { getLyrics } = require('genius-lyrics-api');

const apiKey = 'R_o7DqyqREiiYRdfwTw5oXl406hqmPK9k4nUsKHyj4lMQcBH5oFKM1IVomD08nqo';

const failedSongs = [];

const Singles = [
    "Demon Inside",
    "Till Hell Freezes Over",
    "Any Man",
    "Bad Influence",
    "Our House",
    "Fuck You",
    "Quitter",
    "I Remember",
    "8 Mile",
    "Bump Heads",
    "Wanksta",
    "Nail In The Coffin",
    "The Sauce",
    "Hail Mary",
    "Foolish Pride"
];

const SoulIntent = [
    "Fattest Skinny Kid Alive",
    "Steppin’ On To The Scene",
    "Don’t Chew With Your Mouth Full",
    "Unreallistically Graphic"
];

const BadMeetsEvil = [
    "Nuttin’ To Do",
    "Scary Movies"
];

const D12 = [
    "Chance to Advance",
    "Desperados",
    "Filthy"
];

const SlimShadyEP = [
    "Murder, Murder",
    "If I Had",
    "Low Down, Dirty",
    "Just the Two of Us",
    "No One’s Iller"
];

const Infinite = [
    "Infinite",
    "It’s O.K.",
    "Tonite",
    "313",
    "Maxine",
    "Open Mic",
    "Never 2 Far",
    "Searchin",
    "Backstabber",
    "Jealousy Woes II"
];

const theSlimShadyLP = [
    "My Name Is",
    "Guilty Conscience",
    "Brain Damage",
    "If I Had",
    "'97 Bonnie & Clyde",
    "Role Model",
    "My Fault",
    "Cum on Everybody",
    "Rock Bottom",
    "Just Don’t Give a Fuck",
    "As the World Turns",
    "I’m Shady",
    "Bad Meets Evil",
    "Still Don’t Give a Fuck"
];

const TheMarshallMathersLP = [
    "Kill You",
    "Stan",
    "Who Knew",
    "The Way I Am",
    "The Real Slim Shady",
    "Remember Me?",
    "I’m Back",
    "Marshall Mathers",
    "Drug Ballad",
    "Amityville",
    "Bitch Please II",
    "Kim",
    "Under the Influence",
    "Criminal",
    "The Kids"
];

const TheEminemShow = [
    "White America",
    "Business",
    "Cleanin' Out My Closet",
    "Square Dance",
    "Soldier",
    "Say Goodbye Hollywood",
    "Drips",
    "Without Me",
    "Sing for the Moment",
    "Superman",
    "Hailie's Song",
    "When the Music Stops",
    "Say What You Say",
    "Till I Collapse",
    "My Dad's Gone Crazy"
];

const Encore = [
    "Evil Deeds",
    "Never Enough",
    "Yellow Brick Road",
    "Like Toy Soldiers",
    "Mosh",
    "Puke",
    "My 1st Single",
    "Rain Man",
    "Big Weenie",
    "Just Lose It",
    "Ass Like That",
    "Spend Some Time",
    "Mockingbird",
    "Crazy in Love",
    "One Shot 2 Shot",
    "Encore / Curtains Down",
    "We As Americans",
    "Love You More",
    "Ricky Ticky Toc"
];

const Relapse = [
    "3 a.m.",
    "My Mom",
    "Insane",
    "Bagpipes From Baghdad",
    "Hello",
    "Same Song & Dance",
    "We Made You",
    "Medicine Ball",
    "Stay Wide Awake",
    "Old Time's Sake",
    "Must Be the Ganja",
    "Déjà Vu",
    "Beautiful",
    "Crack a Bottle",
    "Underground",
    "My Darling",
    "Careful What You Wish For"
];

const Recovery = [
    "Cold Wind Blows",
    "Talkin' 2 Myself",
    "On Fire",
    "Won't Back Down",
    "W.T.P.",
    "Going Through Changes",
    "Not Afraid",
    "Seduction",
    "No Love",
    "Space Bound",
    "Cinderella Man",
    "25 to Life",
    "So Bad",
    "Almost Famous",
    "Love the Way You Lie",
    "You're Never Over",
    "Untitled",
    "Ridaz",
    "Session One"
];

const TheMarshallMathersLP2 = [
    "Bad Guy",
    "Rhyme or Reason",
    "So Much Better",
    "Survival",
    "Legacy",
    "Asshole",
    "Berzerk",
    "Rap God",
    "Brainless",
    "Stronger Than I Was",
    "The Monster",
    "So Far...",
    "Love Game",
    "Headlights",
    "Evil Twin"
];

const Revival = [
    "Walk on Water",
    "Believe",
    "Chloraseptic",
    "Untouchable",
    "River",
    "Remind Me",
    "Like Home",
    "Bad Husband",
    "Tragic Endings",
    "Framed",
    "Nowhere Fast",
    "Heat",
    "Offended",
    "Need Me",
    "In Your Head",
    "Castle",
    "Arose"
];

const Kamikaze = [
    "The Ringer",
    "Greatest",
    "Lucky You",
    "Normal",
    "Stepping Stone",
    "Not Alike",
    "Kamikaze",
    "Fall",
    "Nice Guy",
    "Good Guy",
    "Venom"
];

const MusicToBeMurderedBy = [
    "Black Magic",
    "Alfred’s Theme",
    "Tone Deaf",
    "Book of Rhymes",
    "Favorite Bitch",
    "Guns Blazing",
    "Gnat",
    "Higher",
    "These Demons",
    "She Loves Me",
    "Killer",
    "Zeus",
    "Discombobulated",
    "Premonition",
    "Unaccommodating",
    "You Gon' Learn",
    "Those Kinda Nights",
    "In Too Deep",
    "Godzilla",
    "Darkness",
    "Leaving Heaven",
    "Yah Yah",
    "Stepdad",
    "Marsh",
    "Never Love Again",
    "Little Engine",
    "Lock It Up",
    "Farewell",
    "No Regrets",
    "I Will"
];

const TheDeathOfSlimShady = [
    "Renaissance",
    "Habits",
    "Brand New Dance",
    "Evil",
    "Lucifer",
    "Antichrist",
    "Fuel",
    "Road Rage",
    "Houdini",
    "Guilty Conscience 2",
    "Head Honcho",
    "Temporary",
    "Bad One",
    "Tobey",
    "Somebody Save Me"
];

const StraightFromTheLab = [
    "Monkey See, Monkey Do",
    "We As Americans",
    "Love You More",
    "Can I Bitch",
    "Bully",
    "6 in the Morning by D12",
    "Doe Rae Me",
    "The Kids",
    "Stimulate",
    "Rabbit Run",
    "The Conspiracy Freestyle",
    "Bump Heads",
    "God Is Cleaning Out My Closet"
];

const firstPeriodAlbums = [Infinite, theSlimShadyLP, TheMarshallMathersLP, TheEminemShow, StraightFromTheLab, Encore, Singles, SoulIntent, BadMeetsEvil, D12, SlimShadyEP];
const firstAlbumNames = ["Infinite", "The Slim Shady LP", "The Marshall Mathers LP", "The Eminem Show", "Straight From The Lab", "Encore", "Singles","Soul Intent","Bad Meets Evil","D12", "Slim Shady EP"];
const secondPeriodAlbums = [Relapse, Recovery, TheMarshallMathersLP2, Revival, Kamikaze, MusicToBeMurderedBy, TheDeathOfSlimShady];
const secondAlbumNames = ["Relapse", "Recovery", "The Marshall Mathers LP 2", "Revival", "Kamikaze", "Music To Be Murdered By", "The Death Of Slim Shady"];

const saveLyricsToCSV = (songTitle, lyrics, album, csvFilename) => {
    const fileExists = fs.existsSync(csvFilename);
    const data = `"${songTitle}","${lyrics.replace(/"/g, '""')}","${album}"\n`;
    const utf8Bom = '\uFEFF';
    if (!fileExists) {
        const headers = 'Song Title,Lyrics,Album\n';
        fs.writeFileSync(csvFilename, utf8Bom + headers, { encoding: 'utf8' });
    }

    fs.appendFile(csvFilename, data, { encoding: 'utf8' }, (err) => {
        if (err) {
            console.error(`Error saving lyrics for "${songTitle}" to CSV:`, err);
        } else {
            console.log(`Lyrics for "${songTitle}" saved to ${csvFilename}`);
        }
    });
};

const fetchAndSaveLyrics = async (songTitle, albumName, artist, csvFilename) => {
    const options = {
        apiKey: apiKey,
        title: songTitle,
        artist: artist,
        optimizeQuery: true
    };

    try {
        const lyrics = await getLyrics(options);
        if (lyrics) {
            saveLyricsToCSV(songTitle, lyrics, albumName, csvFilename);
        } else {
            console.log(`Couldn't get lyrics for "${songTitle}".`);
            failedSongs.push(songTitle); // Log failed songs
        }
    } catch (error) {
        console.error(`Error fetching lyrics for "${songTitle}":`, error);
        failedSongs.push(songTitle); // Log failed songs
    }
};

const processSongs = async (albums, albumNames, csvFilename, artist) => {
    for (let i = 0; i < albums.length; i++) {
        const album = albums[i];
        const albumName = albumNames[i];
        for (const songTitle of album) {
            await fetchAndSaveLyrics(songTitle, albumName, artist, csvFilename);
        }
    }
};

const main = async () => {
    console.log('Processing first period albums...');
    await processSongs(firstPeriodAlbums, firstAlbumNames, 'LyricsFirstPeriod.csv', 'Eminem');

    console.log('Processing Soul Intent songs...');
    await processSongs([SoulIntent], ["Soul Intent"], 'LyricsFirstPeriod.csv', 'Soul Intent');

    console.log('Processing Bad Meets Evil songs...');
    await processSongs([BadMeetsEvil], ["Bad Meets Evil"], 'LyricsFirstPeriod.csv', 'Bad Meets Evil');

    console.log('Processing D12 songs...');
    await processSongs([D12], ["D12"], 'LyricsFirstPeriod.csv', 'D12');

    console.log('Processing second period albums...');
    await processSongs(secondPeriodAlbums, secondAlbumNames, 'LyricsSecondPeriod.csv', 'Eminem');

    // Print failed songs
    if (failedSongs.length > 0) {
        console.log('Failed to fetch lyrics for the following songs:');
        console.log(failedSongs.join('\n'));
    } else {
        console.log('Successfully fetched lyrics for all songs.');
    }
};

main();