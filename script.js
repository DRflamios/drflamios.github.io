$(document).ready(function() {
    const username = 'DRflamios';

    $('#loading-state').show();

    $.ajax({
        url: `https://api.github.com/users/${username}`,
        success: function(user) {
            $('#loading-state').hide();

            $('#user-avatar').attr('src', user.avatar_url);
            $('#user-name').text(user.name);
            $('#user-login').text('@' + user.login);
            $('#user-bio').text(user.bio);

            if (user.location) {
                $('#user-location').show();
                $('#location-text').text(user.location);
            }

            $('#user-repos').text(user.public_repos);
            $('#user-followers').text(user.followers);
            $('#user-following').text(user.following);
            $('#user-created-at').text(new Date(user.created_at).toLocaleDateString());

            $.ajax({
                url: `https://api.github.com/users/${username}/repos`,
                success: function(repos) {
                    const topRepos = repos.sort((a, b) => b.stargazers_count - a.stargazers_count).slice(0, 6);

                    $.each(topRepos, function(index, repo) {
                        const repoHTML = `
                            <div class="bg-gray-800 p-6 rounded-lg">
                                <h3 class="text-xl font-bold text-white">
                                    <a href="${repo.html_url}" target="_blank" class="hover:text-blue-400">${repo.name}</a>
                                </h3>
                                <p class="mt-2 text-gray-400">${repo.description}</p>
                                <div class="mt-4 flex items-center gap-4 text-white">
                                    <template>
                                        <span class="flex items-center gap-1">
                                            <span class="w-3 h-3 rounded-full bg-blue-400"></span>
                                            <span>${repo.language}</span>
                                        </span>
                                    </template>
                                    <span class="flex items-center gap-1">
                                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                        </svg>
                                        <span>${repo.stargazers_count}</span>
                                    </span>
                                    <span class="flex items-center gap-1">
                                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path fill-rule="evenodd" d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm0 2h10v7h-2l-1 2H8l-1-2H5V5z" clip-rule="evenodd"/>
                                        </svg>
                                        <span>${repo.forks_count}</span>
                                    </span>
                                </div>
                            </div>
                        `;
                        $('#top-repos').append(repoHTML);
                    });

                    $('#content').show();
                },
                error: function(xhr, status, error) {
                    $('#error-state').text('Failed to load GitHub data. Please try again later.');
                    $('#error-state').show();
                }
            });
        },
        error: function(xhr, status, error) {
            $('#error-state').text('Failed to load GitHub data. Please try again later.');
            $('#error-state').show();
        }
    });
});