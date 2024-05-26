require_relative "boot"

require "rails/all"

Bundler.require(*Rails.groups)

module TimeregApi
  class Application < Rails::Application
    config.load_defaults 7.1
    config.autoload_lib(ignore: %w(assets tasks))
    config.api_only = true

    # Sessiot / Evästeet
    config.middleware.use ActionDispatch::Cookies
    config.middleware.use ActionDispatch::Session::CookieStore

    # CORS
    config.middleware.insert_before 0, Rack::Cors do
      allow do
        origins 'localhost:3000'  # Aseta frontendin URL
        resource '*',
          headers: :any,
          methods: [:get, :post, :put, :patch, :delete, :options, :head],
          credentials: true  # Salli evästeiden ja tunnisteiden välitys
      end
    end
  end
end
